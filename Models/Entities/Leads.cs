using System.ComponentModel.DataAnnotations;

namespace SistemaSeguridad.Models.Entities;

public class Lead
{
    public int Id { get; set; }

    [Required, MaxLength(100)]
    public string Nombre { get; set; } = string.Empty;

    [Required, MaxLength(20)]
    public string Telefono { get; set; } = string.Empty;

    [Required, EmailAddress, MaxLength(120)]
    public string Email { get; set; } = string.Empty;

    [Required, MaxLength(80)]
    public string Servicio { get; set; } = string.Empty;

    [Required, MaxLength(500)]
    public string Mensaje { get; set; } = string.Empty;

    public DateTime FechaRegistro { get; set; } = DateTime.Now;
}