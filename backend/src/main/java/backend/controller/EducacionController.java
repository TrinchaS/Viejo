package backend.controller;

import backend.modelo.Educacion;
import backend.service.EducacionService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200/")
public class EducacionController {
    
    @Autowired
    private EducacionService eduService;
    
    @GetMapping("/verEducaciones")
    public List<Educacion> verEducaciones(){
        return eduService.verEducaciones();
    }
    
    @PostMapping("/creaEducacion")
    public String crearEducacion(@RequestBody Educacion nueva){
        eduService.guardarEducacion(nueva);
        return "Educacion creado.";
    }
    
    @GetMapping("/buscaEducacion/{id}")
    public Educacion buscaEducacion(@PathVariable Long id){
        return eduService.buscarEducacion(id);
    }
    
    @PutMapping("/editaEducacion")
    public String editaEducacion(@PathVariable Long id,
                             @RequestParam("instituto") String nuevoInstituto,
                             @RequestParam("titulo") String nuevoTitulo,
                             @RequestParam("fIngreso") String nuevofIngreso,
                             @RequestParam("fEgreso") String nuevofEgreso){
        Educacion nueva = eduService.buscarEducacion(id);
        nueva.setInstituto(nuevoInstituto);
        nueva.setTitulo(nuevoTitulo);
        nueva.setFIngreso(nuevofIngreso);
        nueva.setFEgreso(nuevofEgreso);
        eduService.guardarEducacion(nueva);
        return "Educacion editado.";
    }    
    
    @DeleteMapping("/borrarEducacion/{id}")
    public String borrarEducacion(@PathVariable Long id){
        eduService.borrarEducacion(id);
        return "Educacion borrado.";
    }
    
}
