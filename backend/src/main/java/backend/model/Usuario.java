package backend.model;

import java.util.HashSet;
import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
@Table(name = "usuarios",uniqueConstraints = {
        @UniqueConstraint(columnNames = {"username"}),
        @UniqueConstraint(columnNames = {"email"})
        })
public class Usuario {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "nombre", nullable=false)
    private String nombre;
    
    @Column(name = "username", nullable=false)
    private String username;
    
    @Column(name = "email", nullable=false)
    private String email;
    
    @Column(name = "password", nullable=false)
    private String password;
    
    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name="usuarios_roles", 
            joinColumns = @JoinColumn(name="usuario_id",referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "rol_id",referencedColumnName="id"))

    private Set<Rol> roles = new HashSet<>();

    public Usuario() {
    }

    public Usuario(String nombre, String username, String email, String password) {
        this.nombre = nombre;
        this.username = username;
        this.email = email;
        this.password = password;
    }
    
}
