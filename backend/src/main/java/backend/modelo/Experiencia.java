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
public class Experiencia {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    
    @NotNull
    private String puesto;
    @NotNull
    private String empresa;
    @NotNull
    private String jornada;
    
    private String fIngreso;
    private String fEgreso;
    private String ubicacion;
    private String pais;
    
    public Experiencia(){}
    
    public Experiencia(Long id, String puesto, String empresa, String jornada,
            String fIngreso, String fEgreso, String ubicacion, String pais){
        this.id = id;
        this.puesto = puesto;
        this.empresa = empresa;
        this.jornada = jornada;
        this.fIngreso = fIngreso;
        this.fEgreso = fEgreso;
        this.ubicacion = ubicacion;
        this.pais = pais;
    }
}
