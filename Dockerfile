# ============================================
# Etapa 1: Build (compilar la app)
# ============================================
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copia el csproj y restaura dependencias (caché eficiente)
COPY ["SistemaSeguridad.csproj", "./"]
RUN dotnet restore "SistemaSeguridad.csproj"

# Copia el resto del código y publica
COPY . .
RUN dotnet publish "SistemaSeguridad.csproj" -c Release -o /app/publish /p:UseAppHost=false

# ============================================
# Etapa 2: Runtime (imagen ligera para correr)
# ============================================
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .

# Railway inyecta la variable PORT, ASP.NET Core debe escuchar ahí
ENV ASPNETCORE_URLS=http://+:${PORT:-8080}
EXPOSE 8080

ENTRYPOINT ["dotnet", "SistemaSeguridad.dll"]