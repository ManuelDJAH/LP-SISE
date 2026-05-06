using SistemaSeguridad.Data.Repositories;
using SistemaSeguridad.Models.Entities;
using SistemaSeguridad.Models.ViewModels;

namespace SistemaSeguridad.Services;

public class LeadService : ILeadService
{
    private readonly ILeadRepository _repo;
    private readonly ILogger<LeadService> _log;

    public LeadService(ILeadRepository repo, ILogger<LeadService> log)
    {
        _repo = repo;
        _log = log;
    }

    public async Task<(bool ok, string mensaje)> RegistrarAsync(ContactoForm form)
    {
        try
        {
            var lead = new Lead
            {
                Nombre = form.Nombre.Trim(),
                Telefono = form.Telefono.Trim(),
                Email = form.Email.Trim().ToLower(),
                Servicio = form.Servicio,
                Mensaje = form.Mensaje.Trim()
            };

            await _repo.AgregarAsync(lead);
            return (true, "¡Gracias! Te contactaremos pronto.");
        }
        catch (Exception ex)
        {
            _log.LogError(ex, "Error registrando lead");
            return (false, "Ocurrió un error. Intenta de nuevo.");
        }
    }
}