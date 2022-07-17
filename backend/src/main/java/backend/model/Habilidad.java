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
import javax.persistence.UniqueConstraint;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@Entity
@Table(name = "habilidad", uniqueConstraints = {@UniqueConstraint(columnNames = {"nombre"})} )
public class Habilidad{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "nombre", nullable=false)
    private String nombre;
    
    @Column(name = "porcentaje", nullable=false)
    private String porcentaje;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "persona_id", nullable = false)
    private Persona habPersona;
    
    public Habilidad() {}

}
