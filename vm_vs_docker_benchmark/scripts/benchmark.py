# benchmark.py
import psutil
import time

print("📊 Benchmarking system resources (30s sample)...")

cpu_samples = []
mem_samples = []

start_time = time.time()
while time.time() - start_time < 30:
    cpu = psutil.cpu_percent(interval=1)
    mem = psutil.virtual_memory().percent
    cpu_samples.append(cpu)
    mem_samples.append(mem)
    print(f"CPU: {cpu:.2f}% | Mem: {mem:.2f}%")

print("\n📈 Summary:")
print(f"CPU Avg: {sum(cpu_samples)/len(cpu_samples):.2f}%")
print(f"Mem Avg: {sum(mem_samples)/len(mem_samples):.2f}%")
