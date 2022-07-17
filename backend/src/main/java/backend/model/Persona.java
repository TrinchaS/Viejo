package backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@Entity
@Table(name = "persona") //, uniqueConstraints = {@UniqueConstraint(columnNames = {""})} )
public class Persona {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "nombre", nullable=false)
    private String nombre;
    
    @Column(name = "apellido", nullable=false)
    private String apellido;
    
    private String tituloNivel;
    private String fnacimiento;
    private String recide;
    private String email;
    private String whatsapp;
    private String facebook;
    private String fotoURL;
    private String logoURL;
    private String acerca;
    
    @JsonBackReference
    @OneToMany(mappedBy="eduPersona", cascade = CascadeType.ALL, orphanRemoval = true )
    private List<Educacion> educacionList;
    //private Set<Educacion> educacionList = new HashSet<>();
    
    @JsonBackReference
    @OneToMany(mappedBy="expPersona", cascade = CascadeType.ALL, orphanRemoval = true )
    private List<Experiencia> experienciaList;
    
    @JsonBackReference
    @OneToMany(mappedBy="habPersona", cascade = CascadeType.ALL, orphanRemoval = true )
    private List<Habilidad> habilidadList;
    
    @JsonBackReference
    @OneToMany(mappedBy="proPersona", cascade = CascadeType.ALL, orphanRemoval = true )
    private List<Proyecto> proyectoList;
    
    public Persona() {
    }

        
}
