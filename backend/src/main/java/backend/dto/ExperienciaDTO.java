package backend.dto;

import javax.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ExperienciaDTO {
    
    private Long id;
    
    @NotEmpty(message="El puesto no debe ser vacio o nulo.")
    private String puesto;
    
    @NotEmpty(message="La empresa no debe ser vacia o nula.")
    private String empresa;
    
    private String jornada;
    private String fingreso;
    private String fegreso;
    private String ubicacion;
    private String pais;
    
    @NotEmpty(message="La descripcion no debe ser vacia o nula.")
    private String descripcion;

    public ExperienciaDTO() {
    }
    
}
