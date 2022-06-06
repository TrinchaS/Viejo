package backend.modelo;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@Entity
public class Educacion {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    
    @NotNull
    @Size(min=3,max=20,message="El nombre del Insttituto no cumple con la longitud (3,20)")
    private String instituto;
    
    @NotNull
    @Size(min=3,max=20,message="El Titulo no cumple con la longitud (3,20)")
    private String titulo;
    private String fIngreso;
    private String fEgreso;
    
    public Educacion(){}
    
    public Educacion (Long id, String instituto, String titulo, String fIngreso, String fEgreso){
        this.id = id;
        this.instituto = instituto;
        this.titulo = titulo;
        this.fIngreso = fIngreso;
        this.fEgreso = fEgreso;        
    }
    
}
