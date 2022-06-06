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
public class Habilidad {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    
    @NotNull
    @Size(min=3,max=20,message="El nombre de la Habilidad no cumple con la longitud (3,20)")
    private String nombre;
    
    @NotNull
    private String porcentaje;

    public Habilidad() {}
    
    public Habilidad(Long id, String nombre, String porcentaje){
        this.id = id;
        this.nombre = nombre;
        this.porcentaje = porcentaje;
    }
    
}
