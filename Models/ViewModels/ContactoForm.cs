using System.ComponentModel.DataAnnotations;

namespace SistemaSeguridad.Models.ViewModels;

public class ContactoForm
{
    [Required(ErrorMessage = "El nombre es obligatorio")]
    [StringLength(100)]
    public string Nombre { get; set; } = string.Empty;

    [Required(ErrorMessage = "El teléfono es obligatorio")]
    [Phone(ErrorMessage = "Teléfono inválido")]
    public string Telefono { get; set; } = string.Empty;

    [Required(ErrorMessage = "El email es obligatorio")]
    [EmailAddress(ErrorMessage = "Email inválido")]
    public string Email { get; set; } = string.Empty;

    [Required(ErrorMessage = "Selecciona un servicio")]
    public string Servicio { get; set; } = string.Empty;

    [Required(ErrorMessage = "El mensaje es obligatorio")]
    [StringLength(500)]
    public string Mensaje { get; set; } = string.Empty;
}