# **Declaración de Alcance y Metodología para la Determinación del Dígito Verificador de Patentes**

Este proyecto es una aplicación informática que calcula el dígito verificador de patentes de vehículos de la Ciudad Autónoma de Buenos Aires (CABA) siguiendo una lógica predeterminada.

El proceso implica la sustitución de letras por valores numéricos según una tabla de equivalencias. Los dígitos de la secuencia resultante se suman de forma alternada, comenzando por la derecha, para obtener el dígito final.

## **Estructura de Componentes**

El proyecto se compone de tres archivos principales:

* **index.html**: Define la interfaz de usuario, incluyendo el campo de entrada y el control de cálculo.  
* **styles.css**: Contiene los estilos visuales del entorno, con diseño adaptable a diferentes dispositivos.  
* **values.json**: Almacena la tabla de correspondencias entre letras y números, facilitando su actualización.

## **Procedimiento de Operación**

La ejecución requiere la clonación del repositorio y la apertura del archivo index.html en un navegador. Tras ingresar la patente y activar el cálculo, el dígito verificador será expuesto en la interfaz.

## **Aportaciones al Proyecto**

Cualquier discrepancia en la tabla de valores o en la lógica de cálculo debe ser comunicada a través de un informe de incidencia (*issue*) o una propuesta de modificación (*pull request*).