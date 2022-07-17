package backend.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class PersonaDTO {
    
    private Long id;
    
    @NotEmpty
    @Size(min=2, message="El nombre debe tener al menos 2 caracteres.")
    private String nombre;
    
    @NotEmpty
    @Size(min=2, message="El apellido debe tener al menos 2 caracteres.")
    private String apellido;
    
    private String tituloNivel;
    private String fnacimiento;
    private String recide;
    
    @Email(message="No tiene el formato de un correo valido.")
    private String email;
    
    private String whatsapp;
    private String facebook;
    private String fotoURL;
    private String logoURL;
    private String acerca;

    public PersonaDTO() {
    } 
    
}
