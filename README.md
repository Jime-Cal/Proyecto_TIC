# Comparación de Rendimiento: Máquina Virtual vs Docker

## Descripción del Proyecto

Este proyecto tiene como objetivo comparar el rendimiento de una aplicación (API MovieDB) ejecutada en dos entornos distintos: una máquina virtual (VM) y un contenedor Docker. Se analizan métricas como uso de CPU, memoria, disco, tiempo de inicio y portabilidad para evaluar cuál opción es más eficiente para desplegar aplicaciones web.

## Información del Entorno

### Máquina Host (Computadora)

- **CPU:** 2.00 GHz, 8 núcleos, 16 hilos.
- **RAM:** 16 GB DDR4 (2x8GB a 3200 MT/s).
- **Sistema Operativo:** Windows 11 Home, versión 24H2.
- **VirtualBox:** Versión 7.1.8 r168469.
- **Docker:** Versión 28.1.1, build 4eba377.

### Máquina Virtual (VirtualBox)

- **Sistema Operativo Huésped:** Ubuntu (con GNOME).
- **CPU asignada:** 4 núcleos virtuales.
- **RAM asignada:** 2560 MB.
- **Espacio en disco:** 12 GB.
- **Red:** NAT.

### Contenedor Docker

- **Imagen base:** `themoviedb:latest` (construida desde `node:18` y `nginx:alpine`).
- **Tamaño de la imagen:** 74.3 MB.
- **Memoria máxima asignada:** 7.463 GiB.
- **Puerto expuesto:** 8080 (host) → 80 (contenedor).

## Resultados Comparativos

### Uso de Recursos

| Métrica                 | Máquina Virtual (VM) | Contenedor Docker (`themoviedb`) |
|-------------------------|----------------------|----------------------------------|
| CPU (Inactivo)          | (Valor %)            | 0.00%                            |
| RAM (Inactivo)          | 1.4GiB               | 14.8MiB                          |
| Espacio en Disco (API)  | 325MB                | 74.4MB                           |

### Tiempos de Inicio

| Entorno                          | Tiempo (segundos) |
|----------------------------------|-------------------|
| Arranque de la VM                | 29.288            |
| Inicio del Contenedor Docker     | 2                 |

## Conclusión

Luego de toda esta investigación y comparación podemos ver que Docker demostró ser mucho más eficiente en el uso de recursos, ya que tiene un menor consumo de RAM y espacio en disco para la API, además ofreció tiempos de inicio mucho más rápidos en comparación con la máquina virtual. 

La implementación con Docker es una opción más ligera y ágil para desplegar la API MovieDB, priorizando la eficiencia y la velocidad de despliegue. 

La elección final dependerá de los requisitos específicos del proyecto, especialmente en cuanto a las necesidades de aislamiento y rendimiento bajo carga.
