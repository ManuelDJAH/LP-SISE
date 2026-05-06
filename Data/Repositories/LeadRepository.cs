using Microsoft.EntityFrameworkCore;
using SistemaSeguridad.Models.Entities;

namespace SistemaSeguridad.Data.Repositories;

public class LeadRepository : ILeadRepository
{
    private readonly AppDbContext _db;

    public LeadRepository(AppDbContext db) => _db = db;

    public async Task<Lead> AgregarAsync(Lead lead)
    {
        _db.Leads.Add(lead);
        await _db.SaveChangesAsync();
        return lead;
    }

    public async Task<List<Lead>> ObtenerTodosAsync() =>
        await _db.Leads.OrderByDescending(l => l.FechaRegistro).ToListAsync();
}