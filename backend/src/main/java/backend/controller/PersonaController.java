package backend.controller;

import backend.modelo.Persona;
import backend.service.PersonaService;
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
public class PersonaController {
    
    @Autowired
    private PersonaService perService;
    
    @GetMapping("/verPersonas")
    public List<Persona> verPersonas(){
        return perService.verPersonas();
    }
    
    @PostMapping("/creaPersona")
    public String crearPersona(@RequestBody Persona nueva){
        perService.guardarPersona(nueva);
        return "Persona Creada.";
    }
    
    @GetMapping("/buscaPersona/{id}")
    public Persona buscaPersona(@PathVariable Long id){
        return perService.buscarPersona(id);
    }
    
    @PutMapping("/editaPersona/{id}")
    public String editaPersona(@PathVariable Long id,
                             @RequestParam("nombre") String nuevNombre,
                             @RequestParam("apellito") String nuevoApellido,
                             @RequestParam("tituloNivel") String nuevoTituloNivel,
                             @RequestParam("fNacimiento") String nuevofNacimiento,
                             @RequestParam("recide") String nuevoRecide,
                             @RequestParam("email") String nuevoEmail,
                             @RequestParam("whatsapp") String nuevoWhatsapp,
                             @RequestParam("facebook") String nuevoFacebook,
                             @RequestParam("fotoURL") String nuevaFotoURL,
                             @RequestParam("logoURL") String nuevoLogoURL,
                             @RequestParam("acerca") String nuevoAcerca){
        Persona nueva = perService.buscarPersona(id);
        nueva.setNombre(nuevNombre);
        nueva.setApellido(nuevoApellido);
        nueva.setTituloNivel(nuevoTituloNivel);
        nueva.setFNacimiento(nuevofNacimiento);
        nueva.setRecide(nuevoRecide);
        nueva.setEmail(nuevoEmail);
        nueva.setWhatsapp(nuevoWhatsapp);
        nueva.setFacebook(nuevoFacebook);
        nueva.setFotoURL(nuevaFotoURL);
        nueva.setLogoURL(nuevoLogoURL);
        nueva.setAcerca(nuevoAcerca);
        perService.guardarPersona(nueva);
        return "Persona Editada.";
    }
    
    @DeleteMapping("/borrarPersona/{id}")
    public String borrarPersona(@PathVariable Long id){
        perService.borrarPersona(id);
        return "Persona Borrada.";
    }
    
}
