<?php   
    include_once 'inc/functions/functions.php';
    include_once 'inc/layout/header.php';

    $id = filter_var($_GET['id'], FILTER_VALIDATE_INT);

    if (!$id) {
        die('No es valido');
    }

    $resultado = obtenerContacto($id);

    $contacto = $resultado->fetch_assoc();
?>



<div class="container-bar">
    <div class="container bar">
        <a href="index.php" class="btn return">Volver</a>
        <h1>Editar Contacto</h1>
    </div>
</div>

<div class="bg-yellow container shadow">
    <form action="#" id="contact">
        <legend>Edite el Contacto <span></span></legend>

        <?php include_once 'inc/layout/formulario.php'; ?>

    </form>
</div>

<?php include_once 'inc/layout/footer.php'; ?>