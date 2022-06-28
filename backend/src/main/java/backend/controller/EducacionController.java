package backend.controller;

import backend.modelo.Educacion;
import backend.service.EducacionService;
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
@RequestMapping("/educacion")
public class EducacionController {
    
    private final EducacionService eduService;
    
    @Autowired
    public EducacionController(EducacionService eduService){
        this.eduService = eduService;
    }
    
    @GetMapping("/verEducaciones")
    public ResponseEntity<List<Educacion>> verEducaciones(){
        List<Educacion> rta = eduService.verEducaciones();
        return new ResponseEntity<>(rta,HttpStatus.OK);
    }
    
    @PostMapping("/creaEducacion")
    public ResponseEntity<Educacion> crearEducacion(@RequestBody Educacion nueva){
        Educacion rta = eduService.guardarEducacion(nueva);
        return new ResponseEntity<>(rta,HttpStatus.CREATED);
    }
    
    @GetMapping("/buscaEducacion/{id}")
    public ResponseEntity<Educacion> buscaEducacion(@PathVariable("id") Long id){
        Educacion rta = eduService.buscarEducacion(id);
        return  new ResponseEntity<>(rta,HttpStatus.OK);
    }
    
    @PutMapping("/editaEducacion")
    public ResponseEntity<Educacion> editaEducacion(@RequestBody Educacion edu){
        Educacion rta = eduService.guardarEducacion(edu);
        return new ResponseEntity<>(rta,HttpStatus.OK);
    }    
    
    @DeleteMapping("/borrarEducacion/{id}")
    public ResponseEntity<?> borrarEducacion(@PathVariable("id") Long id){
        eduService.borrarEducacion(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
}
