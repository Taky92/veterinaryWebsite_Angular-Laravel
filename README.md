# PETCARE
#### Tania Rodríguez Caro
#### 01/2024
***

### Tecnologías utilizadas:

He usado las siguientes:

- **Backend:** framework de PHP, **Laravel**.
- **Base de datos:** MySQL.
- **Frontend:** framework de Typescript, **Angular** con **Material** para el diseño.
- **Despliegue:** docker-compose.

### **Enlace a la página**
IP: http://92.222.220.230/
    
    * Cliente:
        email: tania@gmail.com
        password: 260192
        
    * Veterinario:
        usuario: lorena
        password: 2222

### **Instalación**
- Frontend:
    1. Instalar las dependencias del **package.json**.

            npm install

    2. Ejecutar la aplicación.

            npm start

- Backend:
    1. Instalar las dependencias del **composer.json**.

            composer install

    2. Configurar el fichero **.env** :

        - Copiar el fichero **.env.example** .

                cp .env.example .env
        
        - Modificamos en el fichero **.env** lo siguiente:

            **Para conectarte a mi BBDD:**

                DB_CONNECTION=mysql
                DB_HOST=92.222.220.230
                DB_PORT=3306
                DB_DATABASE=BBDD_PI
                DB_USERNAME=taniarc
                DB_PASSWORD=taky92

            **Para conectarte de forma local:**

            - _No modifiques el fichero **.env**_ .

            - _Ejecuta el comando **php artisan migrate** para la creación de las tablas y la BBDD._

            - _Ejecuta el comando **php artisan db:seed** para rellenar las tablas._

    3.  Hay que linkear la carpeta **storage/app/pdfs** para que se     almacenen los PDFs que subamos a la página y luego puedan mostrarse.

            php artisan storage:link
        
    4. Encender el servidor:

            php artisan serve

## Descripción

**PetCare** es una web de veterinaria en la cual, pueden acceder los veterinarios que trabajan en ella y los clientes registrados y disfrutar de los beneficios que ofrece.

### **Inicio :**
Lo primero que vemos al acceder a la web es el Inicio, que es visible para todo el público, aunque no estés registrado.

En él podemos ver un carrousel con diferentes mensajes, la sección de **Servicios** donde se nombran cada uno de ellos, la sección de **Nosotros** donde se habla de la empresa y **Contacto** se encuentra al final de la página.

![PBF-Inicio](/docs/CapturasApi/home.png)

### **Registro :**
Este es el registro para hacerte socio y poder acceder al resto de las funciones de la web.

*Deben ser mayores de edad para hacerse socio, el teléfono y email no pueden estar ya registrados.*

![PBF-Registro](/docs/CapturasApi/register.png)

### **Login :**
En el login depende de si eres **Cliente** o **Veterinario** debes elegir formulario y loguearte con el *email (cliente)* o con el *usuario (veterinario)*.

![PBF-Login](/docs/CapturasApi/login.png)

***
### **_CLIENTE_**
Al logearte como Cliente, el menú de la derecha muestra las funciones a las que puede acceder el usuario. Que serían **Perfil** y **Logout**.

### **Perfil :**
Aquí podemos ver los datos del usuario y los datos de sus mascotas.

![PBF-Perfil](/docs/CapturasApi/profile.png)

Dentro de las funciones de la sección del propietario están las opciones: 

- #### Editar perfil:

    ![PBF-Editar](/docs/CapturasApi/editUser.png)

- #### Cita previa:
    Se muestran las citas de las mascotas, también se pueden anular y solicitar citas nuevas. *Solo una por mascota*

    *Para anular la cita pide confirmación.*

    ![PBF-Citas-Cliente](/docs/CapturasApi/datesUser.png)

- #### Darse de baja:
    Si el cliente quiere darse de baja se le pregunta si está seguro.

    ![PBF-Baja-Cliente](/docs/CapturasApi/dropOutUser.png)

Luego dentro de las opciones de las mascotas, están las siguientes:

- #### Medicación:
    Se ve toda la información útil de los medicamentos recetados de la mascota seleccionada.

    ![PBF-Medicación](/docs/CapturasApi/medicationUser.png)


- #### Informes:
    Se aprecia el registro de todos los informes de la mascota seleccionada, y se pueden ver los PDFs de dichos informes.

    ![PBF-Informes](/docs/CapturasApi/reportUser.png)

- #### Vacunas:
    Se muestra el seguimiento de las vacunas administradas a la mascota seleccionada.

    ![PBF-Vacunas](/docs/CapturasApi/vaccineUser.png)

***
### **_VETERINARIO_**
Al loguearse como Veterinario, el menú de la derecha muestra las funciones a las que puede acceder el administrador. Que serían **Citas**, **Lista de usuarios** y **Logout**.

### **Citas :**
En esta página se ven todas las citas que tiene este veterinario. Las funciones que tiene son ver los **detalles de la cita, eliminar la cita** y **solicitar una cita nueva**.

![PBF-Citas-Veterinario](/docs/CapturasApi/datesAdmin.png)

- #### Detalles de la cita:
    En la cita de la mascota podemos ver algunos datos del propietario, de la mascota y los detalles de la cita. Y en cada una de estas secciones tienen diferentes funciones:

    ![PBF-Detalle-Cita](/docs/CapturasApi/dateDetail.png)

    #### Propietario:
    En la sección del propietario podemos añadir una nueva mascota, en el caso que quiera aprovechar la cita con otra de sus mascotas para darle de alta a otra mascota.

    ![PBF-Añadir-Mascota](/docs/CapturasApi/addPet.png)

    #### Mascota:
    En la sección de la mascota de la cita, podemos editar sus datos personales y darle de baja.

    *Para dar de baja a una mascota pide confirmación*

    ![PBF-Editar-Mascota](/docs/CapturasApi/editPet.png)

    ![PBF-Baja-Mascota](/docs/CapturasApi/dropOutPet.png)


    #### Detalles de la cita:
    En la sección de los detalles de la cita podemos acceder a sus listados de medicación, informes y vacunas.

    Estas listas son básicamente igual que las del usuario con la diferencia que el Administrador puede añadir y eliminar.

    *Cuando se quiere eliminar se pide confirmación*

    * **_Medicación_**

        ![PBF-Medicación-Admin](/docs/CapturasApi/medicationAdmin.png)

        ![PBF-Añadir-Medicación](/docs/CapturasApi/addMedication.png)


    * **_Informes_**

        ![PBF-Informes-Admin](/docs/CapturasApi/reportAdmin.png)

        ![PBF-Añadir-Informes](/docs/CapturasApi/addReport.png)


    * **_Vacunas_**
    
        ![PBF-Vacunas-Admin](/docs/CapturasApi/vaccineAdmin.png)

        ![PBF-Añadir-Vacunas](/docs/CapturasApi/addVaccine.png)


### **Lista de usuarios :**
La otra función que tiene el Veterinario es el listado de todos los usuarios. Si se selecciona a un usuario y tiene una mascota, se mostrarán los botones y la lista de mascotas aparecerá en el desplegable.

Los botones de **Medicación, Informes y Vacunas** mostrarán las mismas páginas correspondientes de la mascota que hemos visto anteriormente.

Y el botón de **añadir mascota**, mostrará el mismo modal que hemos mostrado en el detalle de la cita.

**Una funcionalidad interesante de esta página es que arriba a la derecha tiene para filtrar por el teléfono del cliente.**

![PBF-Lista-Usuarios](/docs/CapturasApi/userList.png)
