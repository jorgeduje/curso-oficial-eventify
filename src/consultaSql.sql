-- 1. Crear la tabla de eventos
CREATE TABLE public.events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  user_id UUID REFERENCES auth.users(id) 
);
-- dejamos not null el user id del auth para que podamos crear los primeros registros

-- 2. Crear índices para mejorar el rendimiento
CREATE INDEX idx_events_user_id ON events(user_id);
CREATE INDEX idx_events_start_time ON events(start_time);

-- 3. Añadir restricción CHECK para asegurar que end_time es posterior a start_time
ALTER TABLE events ADD CONSTRAINT check_end_after_start 
CHECK (end_time > start_time);

-- CONFIGURACIÓN DE SEGURIDAD (RLS)
-- ==========================================

-- Habilitar Row Level Security
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Crear políticas de seguridad
-- 1. Política para SELECT (leer eventos)
CREATE POLICY "Usuarios pueden ver sus propios eventos"
ON events
FOR SELECT
USING (auth.uid() = user_id);

-- 2. Política para INSERT (crear eventos)
CREATE POLICY "Usuarios pueden insertar sus propios eventos"
ON events
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- 3. Política para UPDATE (actualizar eventos)
CREATE POLICY "Usuarios pueden actualizar sus propios eventos"
ON events
FOR UPDATE
USING (auth.uid() = user_id);

-- 4. Política para DELETE (eliminar eventos)
CREATE POLICY "Usuarios pueden eliminar sus propios eventos"
ON events
FOR DELETE
USING (auth.uid() = user_id);

-- FUNCIÓN PARA ASIGNAR AUTOMÁTICAMENTE EL USER_ID
-- =================================================

-- Función para establecer automáticamente el user_id al usuario actual
CREATE OR REPLACE FUNCTION set_current_user_id()
RETURNS TRIGGER AS $$
BEGIN
  NEW.user_id := auth.uid();
  RETURN NEW;
END;
$$ language 'plpgsql' SECURITY DEFINER;

-- Trigger para asignar automáticamente el user_id al insertar
CREATE TRIGGER events_set_user_id
BEFORE INSERT ON events
FOR EACH ROW
EXECUTE FUNCTION set_current_user_id();

-- INSERTAR DATOS DE EJEMPLO
-- =========================

-- Nota: Reemplaza 'TU_USER_ID' con el ID real del usuario
-- Puedes obtener tu ID de usuario ejecutando: SELECT auth.uid();

-- Insertar eventos de ejemplo
INSERT INTO events (title, description, start_time, end_time)
VALUES 
  ('Reunión del equipo', 'Discutir avances del proyecto y próximos pasos', 
   NOW() + INTERVAL '1 day', NOW() + INTERVAL '1 day 2 hours'),
   
  ('Presentación del proyecto', 'Presentación final a los stakeholders', 
   NOW() + INTERVAL '3 days', NOW() + INTERVAL '3 days 1 hour 30 minutes');

-- CONFIGURACIÓN DE SEGURIDAD PARA STORAGE
-- ==========================================
   -- Crear política para permitir a usuarios autenticados subir archivos
CREATE POLICY "Usuarios autenticados pueden subir imágenes" 
ON storage.objects 
FOR INSERT 
TO authenticated 
WITH CHECK (
  bucket_id = 'avatars' 
  AND auth.uid() IS NOT NULL
);

-- Crear política para permitir a cualquiera leer/descargar imágenes
CREATE POLICY "Cualquiera puede ver imágenes" 
ON storage.objects 
FOR SELECT 
TO public 
USING (
  bucket_id = 'avatars'
);

-- Opcional: Política para permitir a los usuarios eliminar sus propias imágenes
CREATE POLICY "Usuarios pueden eliminar sus propias imágenes" 
ON storage.objects 
FOR DELETE 
TO authenticated 
USING (
  bucket_id = 'avatars' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Opcional: Política para permitir a los usuarios actualizar sus propias imágenes
CREATE POLICY "Usuarios pueden actualizar sus propias imágenes" 
ON storage.objects 
FOR UPDATE 
TO authenticated 
USING (
  bucket_id = 'avatars' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);