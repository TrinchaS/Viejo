package backend.controller;

import backend.modelo.Persona;
import backend.service.PersonaService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200/")
@RequestMapping("/persona")
public class PersonaController {
    
    @Autowired
    private PersonaService perService;
    
    @GetMapping("/verPersonas")
    public ResponseEntity<List<Persona>> verPersonas(){
        List<Persona> rta = perService.verPersonas();
        return new ResponseEntity<>(rta,HttpStatus.OK);
    }
    
    @PostMapping("/creaPersona")
    public ResponseEntity<Persona> crearPersona(@RequestBody Persona nueva){
        Persona rta = perService.guardarPersona(nueva);
        return new ResponseEntity<>(rta,HttpStatus.CREATED);
    }
    
    @GetMapping("/buscaPersona/{id}")
    public ResponseEntity<Persona> buscaPersona(@PathVariable("id") Long id){
        Persona rta = perService.buscarPersona(id);
        return new ResponseEntity<>(rta,HttpStatus.OK);
    }
    
    @PutMapping("/editaPersona")
    public ResponseEntity<Persona> editaPersona(@RequestBody Persona pers){
        Persona rta = perService.guardarPersona(pers);
        return new ResponseEntity<>(rta,HttpStatus.OK);
    }
    
    @DeleteMapping("/borrarPersona/{id}")
    public ResponseEntity<?> borrarPersona(@PathVariable("id") Long id){
        perService.borrarPersona(id);
        return new ResponseEntity(HttpStatus.OK);
    }
    
}
