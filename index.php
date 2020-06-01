<?php 
include_once 'inc/functions/functions.php';
include_once 'inc/layout/header.php';
?>

<div class="container-bar">
    <h1>Agenda de contactos</h1>
</div>

<div class="bg-yellow container shadow">
    <form action="#" id="contact">
        <legend>Añada un contacto <span>Todos los campos son obligatorios</span> </legend>

        <?php include_once 'inc/layout/formulario.php'; ?>
    </form>
</div>

<div class="bg-white container shadow contacts">
    <div class="container-contacts">
        <h2>Contactos</h2>

        <input type="text" id="search" class="searcher shadow" placeholder="Buscar Contactos...">

        <p class="total-contacts"><span></span> Contactos</p>

        <div class="container-table">
            <table id="listing-contacts" class="listing-contacts">
                 <thead>
                     <tr>
                         <th>Nombre</th>
                         <th>Empresa</th>
                         <th>Teléfonos</th>
                         <th>Acciones</th>
                     </tr>
                 </thead>

                 <tbody>
                    <?php $contacts = obtenerContactos();
                        
                        if($contacts->num_rows){ 
                            
                            foreach($contacts as $contact) { ?>
                            <tr>    
                                <td><?php echo $contact['nombre']; ?></td>
                                <td><?php echo $contact['empresa']; ?></td>
                                <td><?php echo $contact['telefono']; ?></td>
                                <td>
                                    <a class="btn-edit btn" href="editar.php?id=<?php echo $contact['id']; ?>">
                                        <i class="fas fa-pen-square"></i>
                                    </a>

                                    <button data-id="<?php echo $contact['id']; ?>" type="button" class="btn-delete btn">
                                        <i class="fas fa-trash-alt"></i>
                                    </button>
                                </td> 
                            </tr>        
                            <?php }
                        } ?>
                 </tbody>
            </table>
        </div>
    </div>
</div>

<?php include_once 'inc/layout/footer.php'; ?>