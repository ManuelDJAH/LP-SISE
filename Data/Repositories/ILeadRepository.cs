using SistemaSeguridad.Models.Entities;

namespace SistemaSeguridad.Data.Repositories;

public interface ILeadRepository
{
    Task<Lead> AgregarAsync(Lead lead);
    Task<List<Lead>> ObtenerTodosAsync();
}