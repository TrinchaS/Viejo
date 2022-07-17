package backend.dto;

import javax.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ProyectoDTO {
    
    private Long id;
    
    @NotEmpty(message="El nombre del proyecto no debe ser vacio o nulo.")
    private String nombre;
    
    private String url;
    private String descripcion;

    public ProyectoDTO() {
    }
    
}
