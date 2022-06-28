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
public class Educacion implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idEdu;
    private String institutoEdu;
    private String tituloEdu;
    private String fingresoEdu;
    private String fegresoEdu;
    
    public Educacion(){}

    public Educacion(Long idEdu, String institutoEdu, String tituloEdu, String fingresoEdu, String fegresoEdu) {
        this.idEdu = idEdu;
        this.institutoEdu = institutoEdu;
        this.tituloEdu = tituloEdu;
        this.fingresoEdu = fingresoEdu;
        this.fegresoEdu = fegresoEdu;
    }
}
