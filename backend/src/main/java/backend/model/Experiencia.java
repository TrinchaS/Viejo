package backend.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@Entity
@Table(name = "experiencia")
public class Experiencia{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "puesto", nullable=false)
    private String puesto;
    
    @Column(name = "empresa", nullable=false)
    private String empresa;
    
    private String jornada;
    private String fingreso;
    private String fegreso;
    private String ubicacion;
    private String pais;
    
    @Column(name = "descripcion", nullable=false)
    private String descripcion;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "persona_id", nullable = false)
    private Persona expPersona;

    public Experiencia(){}

}
