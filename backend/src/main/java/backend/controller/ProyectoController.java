package backend.controller;

import backend.modelo.Proyecto;
import backend.service.ProyectoService;
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
@RequestMapping("/proyecto")
public class ProyectoController {
    
    private final ProyectoService proService;
    
    @Autowired
    public ProyectoController(ProyectoService proService){
        this.proService = proService;
    }
    
    @GetMapping("/verProyectos")
    public ResponseEntity<List<Proyecto>> verProyectos(){
        List<Proyecto> rta = proService.verProyectos();
        return new ResponseEntity<>(rta,HttpStatus.OK);
    }
    
    @PostMapping("/creaProyecto")
    public ResponseEntity<Proyecto> crearProyecto(@RequestBody Proyecto nuevo){
        Proyecto rta = proService.guardarProyecto(nuevo);
        return new ResponseEntity<>(rta,HttpStatus.CREATED);
    }
    
    @GetMapping("/buscaProyecto/{id}")
    public ResponseEntity<Proyecto> buscaProyecto(@PathVariable("id") Long id){
        Proyecto rta = proService.buscarProyecto(id);
        return new ResponseEntity<>(rta,HttpStatus.OK);
    }
    
    @PutMapping("/editaProyecto")
    public ResponseEntity<Proyecto> guardarProyecto(@RequestBody Proyecto nuevo){
        Proyecto rta = proService.guardarProyecto(nuevo);
        return new ResponseEntity<>(rta,HttpStatus.OK);
    }
    
    @DeleteMapping("/borrarProyecto/{id}")
    public ResponseEntity<?> borrarProyecto(@PathVariable("id") Long id){
        proService.borrarProyecto(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
