package backend.controller;

import backend.modelo.Experiencia;
import backend.service.ExperienciaService;
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
@RequestMapping("/experiencia")
public class ExperienciaController {
    
    private final ExperienciaService expService; 
    
    @Autowired
    public ExperienciaController(ExperienciaService expService){
        this.expService = expService;
    }
    
    @GetMapping("/verExperiencias")
    public ResponseEntity<List<Experiencia>> verExperiencias(){
        List<Experiencia> rta = expService.verExperiencias();
        return new ResponseEntity<>(rta,HttpStatus.OK);
    }
    
    @PostMapping("/creaExperiencia")
    public ResponseEntity<Experiencia> crearExperiencia(@RequestBody Experiencia nueva){
        Experiencia rta = expService.guardarExperiencia(nueva);
        return new ResponseEntity<>(rta,HttpStatus.CREATED);
    }
    
    @GetMapping("/buscaExperiencia/{id}")
    public ResponseEntity<Experiencia> buscaExperiencia(@PathVariable("id") Long id){
        Experiencia rta = expService.buscarExperiencia(id);
        return new ResponseEntity<>(rta,HttpStatus.OK);
    }
    
    @PutMapping("/editaExperiencia")
    public ResponseEntity<Experiencia> editaExperiencia(@RequestBody Experiencia nueva){
        Experiencia rta = expService.guardarExperiencia(nueva);
        return new ResponseEntity<>(rta,HttpStatus.OK);
    }
    
    @DeleteMapping("/borrarExperiencia/{id}")
    public ResponseEntity <?> borrarExperiencia(@PathVariable("id") Long id){
        expService.borrarExperiencia(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
