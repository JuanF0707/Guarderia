// ══════════════════════════════════════════════════════════════════════════════
// 🌸 GUARDERÍA — Apps Script para Google Sheets
// ══════════════════════════════════════════════════════════════════════════════
//
// INSTRUCCIONES:
// 1. Abre tu Google Sheet
// 2. Ve a Extensiones → Apps Script
// 3. Borra el código que hay y pega TODO este archivo
// 4. Haz clic en Guardar (ícono de disquete)
// 5. Clic en "Implementar" → "Nueva implementación"
//    - Tipo: Aplicación web
//    - Ejecutar como: Yo (tu cuenta)
//    - Quién tiene acceso: Cualquier persona
// 6. Copia la URL que te da y pégala en el HTML (línea SCRIPT_URL)
// ══════════════════════════════════════════════════════════════════════════════

const HOJA_NOMBRE = "Registros"; // Nombre de la pestaña donde se guardarán los datos

const HEADERS = [
  "ID", "Nombre(s)", "Apellidos", "F. Nacimiento", "Edad",
  "Acudiente", "Parentesco", "Teléfono", "Correo", "Dirección",
  "Salón", "Curso", "Profesora", "Materia",
  "Hora Entrada", "Hora Salida", "Días Asistencia", "Estado",
  "Fecha Registro"
];

// ── Crear encabezados si la hoja está vacía ────────────────────────────────────
function inicializarHoja(hoja) {
  if (hoja.getLastRow() === 0) {
    const headerRow = hoja.getRange(1, 1, 1, HEADERS.length);
    headerRow.setValues([HEADERS]);

    // Estilo encabezado
    headerRow.setBackground("#C2185B");
    headerRow.setFontColor("#FFFFFF");
    headerRow.setFontWeight("bold");
    headerRow.setFontFamily("Arial");
    headerRow.setFontSize(10);
    headerRow.setHorizontalAlignment("center");
    headerRow.setVerticalAlignment("middle");
    hoja.setRowHeight(1, 36);

    // Anchos de columna
    const anchos = [50, 150, 150, 110, 70, 160, 100, 120, 200, 200, 100, 100, 140, 150, 100, 100, 160, 90, 120];
    anchos.forEach((w, i) => hoja.setColumnWidth(i + 1, w));

    // Congelar encabezado
    hoja.setFrozenRows(1);
  }
}

// ── Obtener o crear la hoja ────────────────────────────────────────────────────
function obtenerHoja() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let hoja = ss.getSheetByName(HOJA_NOMBRE);
  if (!hoja) {
    hoja = ss.insertSheet(HOJA_NOMBRE);
  }
  inicializarHoja(hoja);
  return hoja;
}

// ── POST: recibir datos del formulario ─────────────────────────────────────────
function doPost(e) {
  try {
    const datos = JSON.parse(e.postData.contents);
    const hoja  = obtenerHoja();

    const ultimaFila = hoja.getLastRow();
    const nuevoID    = ultimaFila; // fila 1 = headers, fila 2 = ID 1, etc.
    const nuevaFila  = ultimaFila + 1;

    const fila = [
      nuevoID,
      datos.nombres      || "",
      datos.apellidos    || "",
      datos.nacimiento   || "",
      datos.edad         || "",
      datos.acudiente    || "",
      datos.parentesco   || "",
      datos.telefono     || "",
      datos.correo       || "",
      datos.direccion    || "",
      datos.salon        || "",
      datos.curso        || "",
      datos.profesora    || "",
      datos.materia      || "",
      datos.entrada      || "",
      datos.salida       || "",
      datos.dias         || "",
      datos.estado       || "Activo",
      datos.fechaRegistro || new Date().toLocaleDateString("es-CO"),
    ];

    hoja.appendRow(fila);

    // Estilo filas alternas
    const rangeFila = hoja.getRange(nuevaFila, 1, 1, HEADERS.length);
    rangeFila.setFontFamily("Arial");
    rangeFila.setFontSize(10);
    rangeFila.setVerticalAlignment("middle");
    rangeFila.setHorizontalAlignment("center");
    hoja.setRowHeight(nuevaFila, 26);

    if (nuevaFila % 2 === 0) {
      rangeFila.setBackground("#FCE4EC"); // rosado suave para filas pares
    } else {
      rangeFila.setBackground("#FFFFFF");
    }

    // Bordes
    rangeFila.setBorder(true, true, true, true, true, true, "#F48FB1", SpreadsheetApp.BorderStyle.SOLID);

    return ContentService
      .createTextOutput(JSON.stringify({ status: "ok", id: nuevoID }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ── GET: verificar que el script funciona ──────────────────────────────────────
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: "ok",
      mensaje: "🌸 Guardería API activa y funcionando",
      registros: obtenerHoja().getLastRow() - 1
    }))
    .setMimeType(ContentService.MimeType.JSON);
}