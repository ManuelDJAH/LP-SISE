using Microsoft.EntityFrameworkCore;
using SistemaSeguridad.Models.Entities;

namespace SistemaSeguridad.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Lead> Leads => Set<Lead>();
}