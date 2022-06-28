package backend.modelo;

import java.io.Serializable;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@Entity
public class Persona implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
   // @Column(nullable=false, updatable = false)
    private Long idPer;
    private String nombrePer;
    private String apellidoPer;
    private String tituloNivelPer;
    private String fnacimientoPer;
    private String recidePer;
    private String emailPer;
    private String whatsappPer;
    private String facebookPer;
    private String fotoURLPer;
    private String logoURLPer;
    private String acercaPer;
    
    @OneToMany(fetch = FetchType.LAZY, mappedBy="idEdu")
    private List<Educacion> educacionList;
    
    @OneToMany(fetch = FetchType.LAZY, mappedBy="idExp")
    private List<Experiencia> experienciaList;
    
    @OneToMany(fetch = FetchType.LAZY, mappedBy="idHab")
    private List<Habilidad> habilidadList;
    
    @OneToMany(fetch = FetchType.LAZY, mappedBy="idPro")
    private List<Proyecto> proyectoList;
    
    public Persona(){}

    public Persona(Long idPer, String nombrePer, String apellidoPer, String tituloNivelPer, String fnacimientoPer, String recidePer, String emailPer, String whatsappPer, String facebookPer, String fotoURLPer, String logoURLPer, String acercaPer) {
        this.idPer = idPer;
        this.nombrePer = nombrePer;
        this.apellidoPer = apellidoPer;
        this.tituloNivelPer = tituloNivelPer;
        this.fnacimientoPer = fnacimientoPer;
        this.recidePer = recidePer;
        this.emailPer = emailPer;
        this.whatsappPer = whatsappPer;
        this.facebookPer = facebookPer;
        this.fotoURLPer = fotoURLPer;
        this.logoURLPer = logoURLPer;
        this.acercaPer = acercaPer;
    } 
}
