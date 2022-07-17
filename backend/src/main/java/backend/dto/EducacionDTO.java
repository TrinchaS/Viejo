package backend.dto;

import javax.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class EducacionDTO {
    
    private Long id;
    
    @NotEmpty(message="El instituto no debe ser vacio o nulo.")
    private String instituto;
    
    @NotEmpty(message="El titulo no debe ser vacio o nulo.")
    private String titulo;
    
    private String fingreso;
    private String fegreso;

    public EducacionDTO() {
    }
    
}
