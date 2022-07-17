package backend.dto;

import javax.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class HabilidadDTO {
    
    private Long id;
    
    @NotEmpty(message="El nombre no debe ser vacio o nulo.")
    private String nombre;
    
    @NotEmpty(message="El porcentaje no debe ser vacio o nulo.")
    private String porcentaje;

    public HabilidadDTO() {
    }
    
}
