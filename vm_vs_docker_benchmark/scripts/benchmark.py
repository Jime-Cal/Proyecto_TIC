import psutil
import time
import csv
import requests
import os

def benchmark(duration=30, url=None):
    print(f"📊 Benchmarking system resources ({duration}s sample)...")

    cpu_samples = []
    mem_samples = []
    latency_samples = []

    end_time = time.time() + duration

    while time.time() < end_time:
        start = time.time()
        cpu = psutil.cpu_percent(interval=0.5)
        mem = psutil.virtual_memory().percent

        latency = None
        if url:
            try:
                r = requests.get(url, timeout=2)
                latency = time.time() - start
            except Exception as e:
                print(f"Error en petición HTTP: {e}")

        cpu_samples.append(cpu)
        mem_samples.append(mem)
        if latency is not None:
            latency_samples.append(latency)

        print(f"CPU: {cpu:.2f}% | Mem: {mem:.2f}% " + (f"| Latencia: {latency*1000:.2f} ms" if latency else ""))

    # Calcular estadísticas
    def stats(data):
        return {
            "avg": sum(data)/len(data) if data else 0,
            "max": max(data) if data else 0,
            "min": min(data) if data else 0,
            "count": len(data)
        }

    cpu_stats = stats(cpu_samples)
    mem_stats = stats(mem_samples)
    lat_stats = stats(latency_samples)

    # Confirmar entorno
    is_vm = input("¿Estás ejecutando esto en una VM? (s/n): ").strip().lower() == 's'
    env_label = 'vm' if is_vm else 'docker'
    filename = f"benchmark_{env_label}.csv"

    # Guardar archivo en ../results
    script_dir = os.path.dirname(os.path.abspath(__file__))
    filepath = os.path.join(script_dir, "../results", filename)

    with open(filepath, "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        headers = ["cpu_percent", "memory_percent"]
        if url:
            headers.append("latency_seconds")
        writer.writerow(headers)

        for i in range(max(len(cpu_samples), len(mem_samples), len(latency_samples))):
            row = [
                cpu_samples[i] if i < len(cpu_samples) else "",
                mem_samples[i] if i < len(mem_samples) else "",
            ]
            if url:
                row.append(latency_samples[i] if i < len(latency_samples) else "")
            writer.writerow(row)

        # Agregar resumen al final del CSV
        writer.writerow([])  # línea vacía
        writer.writerow(["Resumen"])
        writer.writerow(["Métrica", "Promedio", "Máximo", "Mínimo"])
        writer.writerow(["CPU (%)", f"{cpu_stats['avg']:.2f}", f"{cpu_stats['max']:.2f}", f"{cpu_stats['min']:.2f}"])
        writer.writerow(["RAM (%)", f"{mem_stats['avg']:.2f}", f"{mem_stats['max']:.2f}", f"{mem_stats['min']:.2f}"])
        if url:
            writer.writerow(["Latencia (ms)", f"{lat_stats['avg']*1000:.2f}", f"{lat_stats['max']*1000:.2f}", f"{lat_stats['min']*1000:.2f}"])

    # Imprimir resumen en consola
    print("\n📈 Summary:")
    print(f"CPU Avg: {cpu_stats['avg']:.2f}% | Max: {cpu_stats['max']:.2f}% | Min: {cpu_stats['min']:.2f}%")
    print(f"Mem Avg: {mem_stats['avg']:.2f}% | Max: {mem_stats['max']:.2f}% | Min: {mem_stats['min']:.2f}%")
    if url:
        print(f"Latency Avg: {lat_stats['avg']*1000:.2f} ms | Max: {lat_stats['max']*1000:.2f} ms | Min: {lat_stats['min']*1000:.2f} ms")

    print(f"Total samples: {max(len(cpu_samples), len(mem_samples), len(latency_samples))}")
    print(f"✅ CSV guardado en: {filepath}")

if __name__ == "__main__":
    benchmark(duration=30, url="http://localhost:5173")

