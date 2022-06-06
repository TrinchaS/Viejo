package backend.modelo;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@Entity
public class Proyecto {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotNull
    private String nombre;
    private String url;
    private String descripcion;
    
    public Proyecto(){}
    
    public Proyecto(Long id, String nombre, String url, String descripcion){
        this.id = id;
        this.nombre = nombre;
        this.url = url;
        this.descripcion = descripcion;        
    }
}
