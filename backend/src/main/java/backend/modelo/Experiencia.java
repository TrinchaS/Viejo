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
public class Experiencia implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idExp;
    private String puestoExp;
    private String empresaExp;
    private String jornadaExp;
    private String fingresoExp;
    private String fegresoExp;
    private String ubicacionExp;
    private String paisExp;
    private String descripcionExp;
    
    public Experiencia(){}

    public Experiencia(Long idExp, String puestoExp, String empresaExp, String jornadaExp, String fingresoExp, String fegresoExp, String ubicacionExp, String paisExp, String descripcionExp) {
        this.idExp = idExp;
        this.puestoExp = puestoExp;
        this.empresaExp = empresaExp;
        this.jornadaExp = jornadaExp;
        this.fingresoExp = fingresoExp;
        this.fegresoExp = fegresoExp;
        this.ubicacionExp = ubicacionExp;
        this.paisExp = paisExp;
        this.descripcionExp = descripcionExp;
    }
}
