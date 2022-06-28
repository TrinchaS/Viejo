package backend.controller;

import backend.modelo.Habilidad;
import backend.service.HabilidadService;
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
@RequestMapping("/habilidad")
public class HabilidadController {
    
    @Autowired
    private HabilidadService habService;
    
    @GetMapping("/verHabilidades")
    public ResponseEntity<List<Habilidad>> verHabilidades(){
        List<Habilidad> rta = habService.verHabilidades();
        return new ResponseEntity<>(rta,HttpStatus.OK);
    }
    
    @PostMapping("/creaHabilidad")
    public ResponseEntity<Habilidad> crearHabilidad(@RequestBody Habilidad nueva){
        Habilidad rta = habService.guardarHabilidad(nueva);
        return new ResponseEntity<>(rta,HttpStatus.CREATED);
    }
    
    @GetMapping("/buscaHabilidad/{id}")
    public ResponseEntity <Habilidad> buscaHabilidad(@PathVariable("id") Long id){
        Habilidad rta = habService.buscarHabilidad(id);
        return new ResponseEntity<>(rta,HttpStatus.OK);
    }
    
    @PutMapping("/editaHabilidad")
    public ResponseEntity<Habilidad> editaHabilidad(@RequestBody Habilidad nueva){
        Habilidad rta = habService.guardarHabilidad(nueva);
        return new ResponseEntity<>(rta,HttpStatus.OK);
    }
    
    @DeleteMapping("/borrarHabilidad/{id}")
    public ResponseEntity<?> borrarHabilidad(@PathVariable("id") Long id){
        habService.borrarHabilidad(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
