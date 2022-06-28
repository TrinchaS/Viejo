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
public class Proyecto implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idPro;
    private String nombrePro;
    private String urlPro;
    private String descripcionPro;
    
    public Proyecto(){}

    public Proyecto(Long idPro, String nombrePro, String urlPro, String descripcionPro) {
        this.idPro = idPro;
        this.nombrePro = nombrePro;
        this.urlPro = urlPro;
        this.descripcionPro = descripcionPro;
    }
}
