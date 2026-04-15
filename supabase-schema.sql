-- Tabla de inscripciones
create table inscripciones (
  id uuid default gen_random_uuid() primary key,
  nombre text not null,
  apellido text not null,
  fecha_nacimiento text not null,
  nombre_equipo text not null,
  telefono text not null,
  correo text not null,
  incluye_triples boolean default false,
  monto_usd numeric not null,
  pasarela text not null,
  estado text default 'pendiente', -- pendiente | confirmado
  comprobante_url text,
  numero_comprobante text unique,
  created_at timestamp with time zone default now()
);

-- Tabla de configuración (cupos)
create table configuracion (
  id int primary key default 1,
  cupos_usados int default 0,
  cupos_max int default 60
);

-- Insertar fila inicial de configuración
insert into configuracion (id, cupos_usados, cupos_max) values (1, 0, 60);

-- RLS: permitir lectura pública de cupos
alter table configuracion enable row level security;
create policy "Lectura pública cupos" on configuracion for select using (true);

-- RLS inscripciones: solo insertar desde el cliente
alter table inscripciones enable row level security;
create policy "Insertar inscripción" on inscripciones for insert with check (true);
