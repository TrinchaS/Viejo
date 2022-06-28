package backend.modelo;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@Entity
public class Habilidad implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idHab;
    private String nombreHab;
    private String porcentajeHab;

    public Habilidad() {}

    public Habilidad(Long idHab, String nombreHab, String porcentajeHab) {
        this.idHab = idHab;
        this.nombreHab = nombreHab;
        this.porcentajeHab = porcentajeHab;
    }    
}
