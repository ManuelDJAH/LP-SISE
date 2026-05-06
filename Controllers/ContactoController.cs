using Microsoft.AspNetCore.Mvc;
using SistemaSeguridad.Models.ViewModels;
using SistemaSeguridad.Services;

namespace SistemaSeguridad.Controllers;

[Route("[controller]")]
public class ContactoController : Controller
{
    private readonly ILeadService _service;

    public ContactoController(ILeadService service) => _service = service;

    [HttpPost]
    public async Task<IActionResult> Enviar([FromForm] ContactoForm form)
    {
        if (!ModelState.IsValid)
        {
            var errores = string.Join(" ", ModelState.Values
                .SelectMany(v => v.Errors).Select(e => e.ErrorMessage));
            return Json(new { ok = false, mensaje = errores });
        }

        var resultado = await _service.RegistrarAsync(form);
        return Json(new { ok = resultado.ok, mensaje = resultado.mensaje });
    }
}