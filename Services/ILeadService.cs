using SistemaSeguridad.Models.ViewModels;

namespace SistemaSeguridad.Services;

public interface ILeadService
{
    Task<(bool ok, string mensaje)> RegistrarAsync(ContactoForm form);
}