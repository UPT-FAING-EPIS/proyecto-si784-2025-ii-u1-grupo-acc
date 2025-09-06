# Documento de Visión - Sistema GraphFlow

![Logo UPT](media/logo-upt.png) ![Logo GraphFlow](media/graphflow-logo.png)

## 1. Introducción

### 1.1 Propósito
Definir la visión, alcance, usuarios, funcionalidades y requisitos clave del sistema GraphFlow.

### 1.2 Alcance
Aplicación web académica que permite:
- Ingresar texto (apuntes, resúmenes, ejercicios)
- Procesar información para extraer conceptos clave
- Generar grafo interactivo con orden lógico de aprendizaje
- Editar y exportar el grafo resultante

### 1.3 Definiciones
| Concepto | Descripción |
|----------|-------------|
| GraphFlow | Sistema de organización mediante grafos |
| Grafo | Estructura de nodos y aristas |
| Nodo | Representación de concepto o paso |
| Arista | Conexión entre nodos |
| NLP | Procesamiento de lenguaje natural |

### 1.4 Referencias
- Pressman, R. S., & Maxim, B. R. (2020). Ingeniería de software
- Sommerville, I. (2019). Software Engineering
- IEEE Std 830-1998
- WCAG 2.1

## 2. Posicionamiento

### 2.1 Oportunidad de negocio
Necesidad de herramientas para organizar información académica dispersa.

### 2.2 Definición del problema
Dificultad para organizar apuntes en múltiples formatos que complica el estudio.

## 3. Descripción de interesados y usuarios

### 3.1 Resumen de interesados
| INTERESADO | INTERÉS |
|------------|---------|
| Estudiantes | Organizar apuntes y mejorar estudio |
| Profesores | Herramienta de apoyo pedagógico |
| Universidad UPT | Mejorar rendimiento académico |
| Desarrollador | Diseño, pruebas y calidad |

### 3.6 Necesidades
| NECESIDAD | TIPO |
|-----------|------|
| Organizar apuntes desordenados | Funcional |
| Visualizar relaciones entre conceptos | Funcional |
| Generar mapas de estudio | Funcional |
| Exportar resultados | Funcional |
| Sistema rápido y eficiente | No funcional |
| Sin registro requerido | No funcional |
| Interfaz simple e intuitiva | No funcional |

## 4. Vista General del Producto

### 4.2 Resumen de capacidades
- Carga de texto desde archivo o entrada manual
- Extracción automática de conceptos clave
- Generación de grafo con orden lógico
- Edición interactiva del grafo
- Exportación a PNG, PDF o Markdown
- Almacenamiento local

### 4.5 Licenciamiento e instalación
- Licencia: MIT
- Instalación: No requiere instalación
- Compatibilidad: Windows, macOS, Linux

## 5. Características del producto
- Entrada de datos (texto plano, PDF)
- Procesamiento de texto
- Generación de grafo
- Interfaz visual interactiva
- Edición manual
- Exportación de resultados
- Historial local

## 6. Restricciones
- No procesa imágenes ni texto escaneado
- No soporta colaboración en tiempo real
- Sin autenticación de usuarios
- Límite de 3000 palabras
- Solo español

## 7. Rangos de calidad
- Usabilidad: 80% usuarios en <3 min
- Precisión: 75% flujos coherentes
- Rendimiento: <10 seg para 1000 palabras
- Cobertura: 70% módulos críticos

## 8. Prioridades
- Alta: Entrada datos, generación grafo, visualización
- Media: Edición manual, exportación
- Baja: Búsqueda historial, sugerencias

## Conclusiones
GraphFlow aborda necesidad real de organización eficiente de conocimiento técnico en entorno académico.

## Recomendaciones
- Validar con estudiantes reales
- Aplicar pruebas de caja negra y unitarias
- Documentar métricas de calidad
- Considerar mejoras con IA básica

## Bibliografía
- Pressman, R. S., & Maxim, B. R. (2020)
- Sommerville, I. (2019)
- IEEE Std 830-1998

## Webgrafía
- https://www.w3.org/TR/WCAG21/
- https://cytoscape.org/
- https://d3js.org/
- https://github.com
