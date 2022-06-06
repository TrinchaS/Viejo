package backend.modelo;

import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@Entity
public class Persona {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable=false, updatable = false)
    private Long id;
    
    @NotNull
    @Size(min=6,max=20,message="El nombre no cumple con la longitud (6,20)")
    private String nombre;
    
    @NotNull
    @Size(min=6,max=20,message="El apellido no cumple con la longitud (6,20)")
    private String apellido;
    private String tituloNivel; //Desarrollador Full Stack Jr
    private String fNacimiento;
    private String recide; //Argentina (Rosario)
    private String email;
    private String whatsapp;
    private String facebook;
    private String fotoURL;
    private String logoURL;
    private String acerca;
    
    @OneToMany(fetch = FetchType.LAZY, mappedBy="id")
    private List<Educacion> educacionList;
    
    @OneToMany(fetch = FetchType.LAZY, mappedBy="id")
    private List<Experiencia> experienciaList;
    
    @OneToMany(fetch = FetchType.LAZY, mappedBy="id")
    private List<Habilidad> habilidadList;
    
    @OneToMany(fetch = FetchType.LAZY, mappedBy="id")
    private List<Proyecto> proyectoList;
    
    public Persona(){}
    
    public Persona(Long id, String nombre, String apellido,
            String tituloNivel, String fNacimiento, String recide,
            String email, String whatsapp, String facebook, 
            String fotoURL, String logoURL, String acerca){
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.tituloNivel = tituloNivel;
        this.fNacimiento = fNacimiento;
        this.recide = recide;
        this.email = email;
        this.whatsapp = whatsapp;
        this.facebook = facebook;
        this.fotoURL = fotoURL;
        this.logoURL = logoURL;
        this.acerca = acerca;
    }    
}
