<div class="fields">
        <div class="field">
                <label for="nombre">Nombre</label>
                <input 
                        type="text" 
                        placeholder="Nombre Contacto" 
                        id="nombre"
                        value = "<?php echo ($contacto['nombre']) ? $contacto['nombre'] : ''; ?>"
                >
        </div>

        <div class="field">
                <label for="empresa">Empresa</label>
                <input 
                        type="text" 
                        placeholder="Nombre Empresa" 
                        id="empresa"
                        value = "<?php echo ($contacto['empresa']) ? $contacto['empresa'] : ''; ?>"
                
                >
        </div>

        <div class="field">
                <label for="tel">Teléfono</label>
                <input 
                        type="tel" 
                        placeholder="Teléfono Contacto" 
                        id="tel"
                        value = "<?php echo ($contacto['telefono']) ? $contacto['telefono'] : ''; ?>"
                >
        </div>
</div>
<div class="field send">
        <?php 
                $textoBtn = ($contacto['telefono']) ? 'Guardar' : 'Añadir';
                $accion = ($contacto['telefono']) ? 'editar' : 'crear';
        ?>
        <input type="hidden" id ="accion" Value="<?php echo $accion; ?>">
        <?php if(isset($contacto['id'])) { ?>
                <input type="hidden" id ="id" Value="<?php echo $contacto['id']; ?>"> 
        <?php } ?>
        <input type="submit" value="<?php echo $textoBtn; ?>">
</div>