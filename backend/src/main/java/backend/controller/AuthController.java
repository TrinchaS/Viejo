package backend.controller;

import backend.dto.LoginDTO;
import backend.dto.RegistroDTO;
import backend.model.Rol;
import backend.model.Usuario;
import backend.repository.RolRepository;
import backend.repository.UsuarioRepository;
import backend.security.JWTAuthResonseDTO;
import backend.security.JwtTokenProvider;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collector;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin//(origins = "http://localhost:4200/")
@RequestMapping("/auth")
public class AuthController {
    
    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private UsuarioRepository userRepo;
    
    @Autowired
    private RolRepository rolRepo;
    
    @Autowired 
    private PasswordEncoder passEncoder;
    
    @Autowired
    private JwtTokenProvider jwtTokenProvider; 
    
    @PostMapping("/iniciarSesion")
    public ResponseEntity<JWTAuthResonseDTO> authenticateUser(@RequestBody LoginDTO loginDTO){
        
        boolean existeMail = this.userRepo.existsByUsername(loginDTO.getUsernameOrEmail());
        boolean existeUsuario = this.userRepo.existsByEmail(loginDTO.getUsernameOrEmail());
        
        if(!(existeMail || existeUsuario)){
            return new ResponseEntity("El usuario no existe",HttpStatus.BAD_REQUEST);
        }
        
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginDTO.getUsernameOrEmail(),loginDTO.getPassword()));
        
        SecurityContextHolder.getContext().setAuthentication(authentication);
        
        //obtenemos el token del jwtTokenProvider
	String token = jwtTokenProvider.generarToken(authentication);
        
        //obtenemos el usuario
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        
        JWTAuthResonseDTO jwtDto = new JWTAuthResonseDTO(token, userDetails.getUsername(), userDetails.getAuthorities());
        
        return new ResponseEntity(jwtDto,HttpStatus.OK);
    }
    
    @PostMapping("/registrar")
    public ResponseEntity<?> registrarUsuario(@RequestBody RegistroDTO registroDTO){
        if(this.userRepo.existsByUsername(registroDTO.getUsername())){
            return new ResponseEntity<>("Nombre de usuario ya existente.",HttpStatus.BAD_REQUEST);
        }
        
        if(this.userRepo.existsByEmail(registroDTO.getEmail())){
            return new ResponseEntity<>("El email ya esta registrado.",HttpStatus.BAD_REQUEST);
        }
        
        Usuario usuario = new Usuario();
        usuario.setNombre(registroDTO.getNombre());
        usuario.setUsername(registroDTO.getUsername());
        usuario.setEmail(registroDTO.getEmail());
        usuario.setPassword(this.passEncoder.encode(registroDTO.getPassword()));
        
        Rol roles = this.rolRepo.findByNombre("ROLE_USER").get();
        usuario.setRoles(Collections.singleton(roles));
        
        this.userRepo.save(usuario);
        
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
}
