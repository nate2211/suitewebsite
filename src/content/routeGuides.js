// Editorial content shared by the HTML renderer and the browser interface.
// Describes supported workflows and limitations rather than repeating generic SEO copy.
const entry = (intro, steps, example, cautions) => Object.freeze({intro, steps, example, cautions});

export const TOOL_GUIDES = Object.freeze({
  "/": entry(
    "SuiteOfficeLab groups several independent browser utilities around a practical workflow: inspect a file, make a focused change, and download the result. The primary editors cover CSV tables, DOCX-style documents, slide text, and PDF markup. Smaller tools handle a specific conversion or cleanup without requiring users to navigate a full editor.",
    ["Choose the file format first: use CSV for rows and columns, Word for flowing text, PowerPoint for slide content, or PDF for page-based output.", "Save a separate copy before converting or annotating. Format conversions may flatten formatting or remove editable objects.", "Open the exported file in the application where it will be used and check pagination, accented characters, images, and tables."],
    "A support worker can clean a downloaded CSV report, create a PDF handout, and convert an image into a printable PDF without leaving the suite.",
    ["These tools are not feature-for-feature replacements for Microsoft Office or Adobe Acrobat.", "Some conversions depend on browser capabilities and may not preserve every embedded font, animation, or form field."]
  ),
  "/archive": entry(
    "The archive browser searches public Internet Archive collections rather than private files on your computer. Results can include descriptions, metadata and download formats when the remote source makes them available. Availability depends on the archive record and on third-party network responses.",
    ["Search with a title, author, or other identifying term and narrow the results to relevant document formats.", "Examine the item title, publication information, and file list before opening a preview.", "Use the original item page to verify rights, source attribution, and whether a particular download is suitable for your use."],
    "Searching for an old public technical manual is more reliable with its model number and publication year than with a broad phrase such as 'office manual'.",
    ["Internet Archive materials are third-party content and are not created or endorsed by SuiteOfficeLab.", "Public availability does not automatically grant permission to republish copyrighted works."]
  ),
  "/csv": entry(
    "A CSV is plain text organized into records and fields. Although a grid resembles a spreadsheet, CSV does not store multiple worksheets, cell formatting, or formulas as rich Excel workbooks do. The browser editor is most useful for checking data rows, fixing labels, and exporting a clean text table.",
    ["Import a CSV and confirm the column headers and row counts look correct.", "Use the grid to correct cell values, add rows or columns, and search for inconsistent labels.", "Export a new CSV; reopen it to confirm that commas, quotation marks, and line breaks survived the round trip."],
    "For an inventory sheet with SKU, description, and price columns, check that prices like 19.95 remain one field and product names containing commas stay quoted.",
    ["CSV cannot preserve colors, formulas, cell styles, or workbook tabs.", "Text encodings and delimiter conventions vary across spreadsheet applications; always inspect the exported copy."]
  ),
  "/word": entry(
    "The Word-style editor imports DOCX document content into an editable browser surface. It is suited to drafting paragraphs, headings and basic tables when the exact layout of a complex Office document is not critical. The resulting document should be checked in its destination application.",
    ["Import a DOCX or start from a blank document and type your content.", "Apply supported heading, paragraph, alignment and inline formatting tools.", "Export to the provided HTML, text or Word-compatible output and open the file to verify spacing and pagination."],
    "For a meeting summary, use a heading for the date, short action-item paragraphs, and a small table of owners rather than trying to reproduce a complex branded template.",
    ["A Word-compatible DOC file is not the same thing as a fully fidelity-preserved DOCX package.", "Complex section breaks, advanced layouts, tracked changes and embedded objects may not round-trip accurately."]
  ),
  "/powerpoint": entry(
    "This presentation editor works with slides and editable text content. Imported PPTX decks can contain objects that are difficult to reproduce in a browser, including animations, charts and embedded media. Use the tool for light revisions and review exports before presenting them.",
    ["Import a PPTX presentation and confirm the expected slides appear in the slide navigator.", "Edit supported slide titles, body text and presenter notes, checking each slide after a change.", "Export the result and open it in presentation software to review layout, images and media."],
    "A simple training deck with one title and a few bullets per slide is a better candidate than a deck built around animated diagrams or embedded video.",
    ["Do not assume imported animations, transitions or linked assets are editable.", "Fonts or layouts can differ when a presentation is opened on another device."]
  ),
  "/pdf": entry(
    "PDFs preserve fixed-position pages, which makes them useful for reviewing and annotating documents. SuiteOfficeLab's PDF workspace supports viewing, markup and exported copies; editing a visible annotation is different from changing the original underlying text in a PDF.",
    ["Open a PDF and use page navigation and zoom to inspect the content.", "Place supported text, notes, shapes, highlights or a signature on the chosen page.", "Export a copy, reopen it, and verify that annotations landed on the intended page at the intended scale."],
    "When marking up a contract draft, use a visible note to flag a clause rather than assuming an overlay permanently removes the text beneath it.",
    ["A dark rectangle over text is not secure redaction. Sensitive information can remain in underlying PDF data.", "Browser-rendered previews can differ from printed size; verify after export."]
  ),
  "/office-tools": entry(
    "The utilities index groups one-task pages by output: PDF and Word viewing, image conversion, CSV cleanup, file compression, media conversion and printing. Direct links are convenient when you already know the desired end format and do not need a full editor.",
    ["Identify the input format from the filename extension and the program that created it.", "Choose the matching tool and inspect any file type or size restrictions.", "Download the output and confirm it opens in the application you intend to use."],
    "If a client sends a phone photo in HEIC format but a form accepts JPG, choose HEIC to JPG instead of opening the full PDF editor.",
    ["Renaming a file extension is not the same as converting its underlying format.", "Repeated conversion between lossy media formats can reduce image or audio quality."]
  ),
  "/convert-pdf": entry(
    "PDF conversion depends on what a page actually contains. A scanned page may be an image, while an exported report may contain selectable text. These two inputs behave differently when extracting text, building a DOCX, or exporting page images.",
    ["Import the PDF and check that all pages render.", "Choose the output that matches your goal: text for extraction, images for appearance, or a document format for further editing.", "Compare a few representative pages, especially tables and graphics, before distributing the converted file."],
    "To reuse one chart from a report, exporting its page as JPG may be more reliable than attempting to reconstruct the entire report as an editable Word document.",
    ["Scanned PDFs generally require OCR for usable text; this converter does not promise OCR accuracy.", "Editable output may lose columns, text positions, interactive forms and precise fonts."]
  ),
  "/convert-word": entry(
    "Converting a DOCX is useful when a recipient needs a fixed PDF, a lightweight HTML preview, or plain text for reuse. Each format makes a different compromise between visual fidelity and editability.",
    ["Import the DOCX and inspect the displayed sections, headings and tables.", "Choose PDF for sharing a fixed view, HTML for a browser-readable structure, or TXT for unformatted text.", "Open the converted file and compare the first, middle and last pages against the original."],
    "A short policy memo with ordinary headings and paragraphs usually converts more predictably than a brochure with floating text boxes and custom page breaks.",
    ["Plain text exports intentionally discard font styles, tables and images.", "Browser PDF output can use different pagination and font metrics than Microsoft Word."]
  ),
  "/view-pdf": entry(
    "A PDF viewer helps check a document without editing it. Useful checks include page count, rotation, readability at normal zoom and whether the intended signature or attachment page is present.",
    ["Select a PDF from your device and let the preview render.", "Navigate to pages containing important tables or text, adjusting zoom for inspection.", "If a preview seems incomplete, compare it with a separate PDF reader before relying on it."],
    "Before sending a scanned form, check the last page and zoom into the signature line to confirm it is readable.",
    ["Viewing does not repair malformed PDF files.", "Password-protected or unusually large files may be unsupported or slow to display."]
  ),
  "/view-word": entry(
    "A browser DOCX preview is a quick way to read headings, paragraphs, lists and tables when Word is unavailable. It is not a guarantee of pixel-identical rendering for complex documents.",
    ["Open the DOCX file and wait for the readable preview.", "Scan headings, tables and lists to make sure the main information is present.", "Use the original file in a compatible office application for formal print-layout verification."],
    "A meeting agenda with a small two-column schedule is an appropriate quick-preview case; a catalog with columns and floating images deserves a full-layout review.",
    ["Headers, footers, tracked changes and embedded objects may not show exactly as authored.", "Only the preview is provided; original-file access controls are not changed."]
  ),
  "/view-powerpoint": entry(
    "A slide-text preview can help you review the order of ideas in a PPTX even when the original design is complex. It emphasizes extracted titles and text instead of promising fully rendered animations and slide masters.",
    ["Import a PPTX and review the number and order of slides.", "Check slide headings, body text and any available notes in the preview.", "For visual sign-off, open the original PPTX in a presentation application."],
    "A quick audit can identify duplicated title slides or a missing final call-to-action slide before a presentation is shared.",
    ["The preview may not reproduce charts, videos, motion paths or theme details.", "Slides that contain only flattened images may have little extractable text."]
  ),
  "/view-csv": entry(
    "CSV viewing is useful for inspecting raw exported records without altering the source. The essential checks are header order, consistent field counts and whether unusual characters or quoted values parse as expected.",
    ["Select a CSV and review the top rows to identify headers and separators.", "Spot-check rows with commas, dates, prices or multiline descriptions.", "If edits are needed, switch to the CSV editor and export a separately named file."],
    "A customer export with 'Last name, First name' inside one quoted field should not become two separate columns.",
    ["A preview does not validate every row in a large dataset.", "CSV has no inherent column types: leading-zero IDs and date-like strings can be changed by downstream spreadsheet programs."]
  ),
  "/sign-document": entry(
    "A visual signature can be applied to a PDF page as drawn or image-based content. This is useful for informal document completion, but it is distinct from a cryptographically validated digital signature or an identity-verified e-signature platform.",
    ["Import the PDF and navigate to the page with the signature field.", "Draw the signature, adjust its position and size in the supplied controls, then export.", "Reopen the signed copy and check that the signature appears on the correct page."],
    "For an internal approval form, add a visible signature and verify the date and page number before sending the result.",
    ["A drawn signature does not by itself establish signer identity or provide a digital certificate.", "Legal and organizational requirements for electronic signatures vary; verify the receiving party's rules."]
  ),
  "/compress-video": entry(
    "Video compression trades bitrate and file size against visual quality. Files with motion, noise or detailed text generally need more bitrate than simple static-screen recordings. SuiteOfficeLab uses browser-side media processing, which can be demanding on memory and CPU.",
    ["Choose a short source clip first to estimate processing time and results.", "Select the available bitrate, frame rate or quality controls and run the compression process.", "Compare the exported file size and watch a representative portion before discarding the source."],
    "A 1080p screen recording with small text needs closer quality inspection than a talking-head clip with a mostly stationary background.",
    ["Browser compression can use substantial resources and may not succeed with very large files.", "Lower bitrate often means more artifacts; there is no setting that guarantees a smaller output with identical quality."]
  ),
  "/compress-mp4": entry(
    "MP4 is a container, not a guarantee of a specific video codec. A compressed MP4 may differ in codec, resolution and audio settings from its source. Choose a target that the destination application can play.",
    ["Open the MP4 file and note its duration and initial size.", "Apply the tool's compression controls, using a moderate quality reduction as a first test.", "Inspect audio synchronization, small text and motion in the exported clip."],
    "If a webcam recording is too large for an assignment portal, test a short sample before processing the entire lecture.",
    ["Exporting an MP4 does not guarantee compatibility with every older device.", "Compressing an already heavily compressed file may give little size reduction."]
  ),
  "/compress-mov": entry(
    "MOV files from phones and cameras may use formats that are not universally accepted by web forms. A smaller export is useful for uploads, but color, frame rate and audio compatibility should be checked after conversion.",
    ["Select a MOV clip and preview a representative portion if the browser supports it.", "Set compression options appropriate to the destination's file-size limit.", "Download and test the result, particularly clips with high dynamic range or variable frame rate."],
    "When an iPhone clip is too large to email, compress a duplicate and confirm it plays on a different device.",
    ["Some MOV codecs may not decode in a given browser or FFmpeg configuration.", "HDR appearance, metadata or orientation can change during transcode."]
  ),
  "/compress-zip": entry(
    "ZIP archives bundle files and optionally compress them. Images, MP4s and other already compressed formats rarely shrink much; plain text, XML and some documents can compress more effectively. Repacking a ZIP can also change metadata and entry order.",
    ["Select a ZIP and inspect the listed contents before processing.", "Use the available cleanup or recompression controls, then export a separately named archive.", "Open the new ZIP and check its file count and a few representative files."],
    "A folder of CSV logs may shrink substantially, while an archive dominated by JPG images may remain nearly the same size.",
    ["Do not assume recompression repairs corrupted entries.", "Encrypted or password-protected ZIP files may not be supported by the browser implementation."]
  ),
  "/convert-csv": entry(
    "CSV conversion is about preserving data semantics while changing a representation. Commas, tabs, semicolons and JSON arrays can all describe tabular records, but nested JSON is not always a rectangular table.",
    ["Import CSV, TSV or JSON and inspect the parsed row and header preview.", "Choose the target format or delimiter and review options for quoting and headers.", "Export and validate records with commas, quotes, blank fields and Unicode characters."],
    "A report with a 'city, state' field must quote that field in comma-delimited output to avoid shifting the following columns.",
    ["Flattening deeply nested JSON can discard relationships between objects.", "Spreadsheet software may reinterpret account numbers, postal codes and dates."]
  ),
  "/csv-to-json": entry(
    "Converting CSV to JSON typically uses the first row as property names and each remaining row as an object. The output works well for APIs and scripts when the table has stable headers and one record per row.",
    ["Check that the CSV's first row contains unique, descriptive field names.", "Convert the records to JSON and inspect quoted strings and escaped characters.", "Validate the JSON syntax and confirm types before using it in a program."],
    "A three-column CSV containing id, name and price may become an array of objects with those keys, but the price can remain a string until your code explicitly parses it.",
    ["Blank or duplicated column names can produce confusing object keys.", "JSON conversion does not infer reliable numeric, date or boolean types from every CSV field."]
  ),
  "/json-to-csv": entry(
    "JSON arrays of similarly shaped objects convert naturally into CSV rows. If records have different properties, the table needs a common set of columns; nested arrays and objects need a deliberate flattening strategy.",
    ["Import a JSON array or supported object structure.", "Review which keys become CSV columns, especially when some records omit values.", "Export and inspect fields with commas, embedded quotes and line breaks."],
    "A list of contacts with name, department and extension keys makes a straightforward CSV. A record containing several phone numbers as an array needs manual review.",
    ["Nested data cannot always be represented cleanly in flat CSV columns.", "Missing keys and explicit null values may both appear as empty fields after export."]
  ),
  "/csv-cleaner": entry(
    "CSV cleanup can improve consistency before importing a file into another program. Trimming whitespace and removing blank rows are useful, but aggressive normalization can erase meaningful spaces or alter intentionally empty records.",
    ["Import the original CSV and inspect a few problematic rows.", "Run the supported cleanup operations, then compare counts and important columns.", "Download the cleaned copy while preserving the original for rollback."],
    "For a mailing list, removing completely empty rows is helpful, but trimming spaces inside a product description may not be appropriate.",
    ["Row-width normalization can expose malformed data rather than automatically correct its meaning.", "Cleaning does not prove that a record is accurate or that two similar names refer to the same person."]
  ),
  "/remove-duplicate-csv-rows": entry(
    "Exact row deduplication removes repeated records, but it does not necessarily detect duplicate real-world entities. Two invoices can share a customer name and amount while still being legitimate separate transactions.",
    ["Review whether the CSV contains a header row and which fields define an exact duplicate.", "Run duplicate removal and note how many rows remain.", "Inspect repeated-looking records and save a new export rather than overwriting source data."],
    "If the same exported line appears twice byte-for-byte, exact-row cleanup is appropriate. Two different orders for the same customer should usually stay separate.",
    ["Case, spacing and punctuation differences can prevent exact duplicate detection.", "Do not deduplicate financial or administrative records without checking the intended uniqueness rule."]
  ),
  "/csv-delimiter-converter": entry(
    "Different applications expect different delimiters. Comma-separated, tab-separated, semicolon-separated and pipe-separated outputs can represent the same table if quoting and escaping are handled correctly.",
    ["Import the file and verify that the detected input delimiter yields the expected columns.", "Choose a target delimiter supported by the receiving system.", "Inspect rows containing the chosen delimiter, quotation marks or multiline text after export."],
    "A European spreadsheet locale may prefer semicolon separators because commas are used in decimal values.",
    ["Replacing commas with semicolons as plain text can corrupt quoted data; use structured parsing.", "The delimiter choice does not automatically convert decimal notation or character encoding."]
  ),
  "/csv-to-pdf": entry(
    "A CSV-to-PDF export produces a readable snapshot of rows and columns for sharing or printing. It is a presentation format; recipients cannot treat the resulting table as an editable CSV without extracting the data again.",
    ["Import the CSV and check header names and column count.", "Generate the PDF representation with the available export control.", "Review page breaks and narrow columns before printing or sending."],
    "A simple shipment list with order number, destination and status can make a useful one-page printout when the columns fit the page.",
    ["Wide tables can wrap, shrink or clip depending on layout.", "Use the original CSV when recipients need to filter, sort or recompute data."]
  ),
  "/pdf-to-jpg": entry(
    "Exporting a PDF page as JPG preserves a visual view of that page for image-based workflows. JPG is a raster format, so text ceases to be selectable and may become blurry when heavily resized.",
    ["Select the PDF and choose one page or the provided all-pages export.", "Pick a suitable rendering quality or resolution when available.", "Review the exported images at their intended display size."],
    "A one-page event flyer can be converted to JPG for posting in a system that accepts images but not PDF attachments.",
    ["Transparency can be flattened and fine text can soften with lossy compression.", "JPG exports do not preserve clickable links, searchable text or document layers."]
  ),
  "/jpg-to-pdf": entry(
    "Packaging an image as a PDF is useful for forms and document submissions that require a PDF attachment. A photo embedded in a PDF remains a picture, not automatically editable or searchable text.",
    ["Choose a supported JPG, JPEG or PNG image and inspect its orientation.", "Convert the image to a PDF with the browser tool.", "Open the result to check margins, page dimensions and print readability."],
    "A photographed receipt can become a shareable PDF attachment, but small printed text should be inspected before the PDF is submitted.",
    ["Conversion does not correct blur, perspective distortion or poor exposure.", "Image-based PDFs are not automatically OCR-searchable."]
  ),
  "/heic-to-jpg": entry(
    "Many phones store photos as HEIC or HEIF to reduce file size. JPG is accepted by a wider range of older websites and applications, although conversion may change transparency, metadata or color rendering.",
    ["Select a HEIC/HEIF file and allow the browser conversion to complete.", "Export the JPG copy without deleting the original photo.", "Inspect the image for orientation, color shifts and fine details."],
    "A customer support form that rejects an iPhone .heic attachment may accept a converted .jpg version of the same photo.",
    ["The result depends on browser support and the conversion library's codec compatibility.", "JPG does not support the same high-efficiency or depth-data features as HEIC."]
  ),
  "/fahrenheit-to-celsius": entry(
    "Fahrenheit and Celsius are temperature scales with different zero points and interval sizes. The conversion formula is (°F − 32) × 5/9. Always record the original unit when moving values into a report. The Fahrenheit and Celsius scales meet at −40 degrees, but most everyday values differ considerably. Temperature readings should not be confused with temperature changes.",
    ["Enter a temperature in Fahrenheit.", "Read the Celsius result and round only to the precision your task needs.", "Keep the unit label next to the value when copying it."],
    "68°F converts to 20°C; 32°F converts to 0°C. Negative temperatures use the same formula.",
    ["These are temperature conversions, not conversions of temperature differences.", "For scientific work, carry extra decimal places before rounding."]
  ),
  "/celsius-to-fahrenheit": entry(
    "To convert a Celsius temperature to Fahrenheit, multiply by 9/5 and add 32. This is useful when reading a weather report, a recipe or device instructions that use another temperature scale. Remember that a conversion changes the numeric expression of the same physical temperature; it does not change the heat of the object being measured.",
    ["Enter the Celsius value in the calculator.", "Review the Fahrenheit result and include the °F unit.", "Use sensible rounding based on the input's precision."],
    "25°C is 77°F, and 100°C is 212°F at standard atmospheric pressure for water boiling.",
    ["A five-degree Celsius change is not a five-degree Fahrenheit change.", "An equipment measurement may require calibrated sensors, not just a unit conversion."]
  ),
  "/convert-to-mp3": entry(
    "MP3 is a widely supported compressed audio format. Extracting audio from video or converting from another audio format can make files easier to share, but it does not restore quality that was lost in the original recording.",
    ["Select a supported audio or video source with a usable audio stream.", "Convert to MP3 and allow browser processing to finish.", "Listen to the beginning, middle and end of the export before sending it."],
    "A recorded training session can be exported as MP3 when a listener only needs the spoken audio rather than the video.",
    ["Large video files can use significant browser memory and processing time.", "Check rights and permissions before extracting or redistributing someone else's recording."]
  ),
  "/mp3-to-wav": entry(
    "WAV commonly stores uncompressed PCM samples and is useful for workflows that expect lossless audio containers. Converting a lossy MP3 to WAV may greatly increase file size, but cannot recreate frequencies already discarded during MP3 encoding.",
    ["Choose the MP3 source and start the browser conversion.", "Export the WAV and compare its duration with the original.", "Open the WAV in the target editor to verify channel count and playback."],
    "A transcription application that prefers WAV may accept a converted MP3 recording, even though the original recording quality stays the same.",
    ["Larger WAV files do not mean an MP3 recording gained fidelity.", "Sample rate and channel configuration may change depending on the converter defaults."]
  ),
  "/wav-to-mp3": entry(
    "WAV audio is often large because it stores samples without perceptual compression. MP3 can be more practical for sharing speech or music when smaller downloads matter more than retaining an uncompressed source. Higher compression tends to make cymbals, reverberation and sharp consonants sound less natural, so listen carefully before deciding that a smaller result is acceptable.",
    ["Select the WAV file and confirm it plays as expected.", "Convert it to MP3 with the available settings.", "Compare filesize and listen for pumping, harsh consonants or missing detail."],
    "A minute-long spoken memo can usually be shared more conveniently as MP3, while the original WAV is better kept for editing.",
    ["Repeated lossy conversions compound audio artifacts.", "Retain the source WAV for archival or production work when possible."]
  ),
  "/print-pdf": entry(
    "Printing a PDF is most reliable when you inspect the page layout and print settings before committing paper. Browser print dialogs can differ in scaling, margins, duplex mode and paper sizes.",
    ["Open the PDF and navigate through the pages to confirm the right document loaded.", "Launch the browser print dialog and choose paper, orientation and scaling.", "Check the preview for clipped margins before printing or saving to PDF."],
    "A letter-size form printed using 'fit to page' can look different from one printed at actual size, which matters for certain templates.",
    ["Browser and printer drivers may apply their own margins.", "For regulated forms requiring exact physical size, confirm the receiving organization's printing rules."]
  ),
  "/print-word": entry(
    "DOCX printing through a browser preview may change pagination because the browser does not reproduce every Word layout rule. The preview is convenient for straightforward documents, but precise print layout should be checked carefully.",
    ["Import the DOCX and look for missing or shifted paragraphs and tables.", "Open the print dialog and check paper size, scale and orientation.", "Print a test page or save a PDF preview before producing multiple copies."],
    "A one-page meeting agenda is a practical case; a multi-section brochure with floating images should be checked in Word or another full office application.",
    ["Different fonts and page-break behavior can change where text lands.", "Headers, footers, comments and tracked changes may not reproduce as expected."]
  ),
});

// Longer, standalone help resources. Link these naturally from the tools, not as mass-generated filler.
export const EDITORIAL_PAGES = Object.freeze({
  "/guides/csv-data-quality": {
    title: "A practical CSV data-quality checklist",
    description: "How to inspect headers, quotation marks, separators, empty rows, duplicate records and identifiers before using a CSV export.",
    sections: [
      ["Start with the source, not the cleanup button", "Save an untouched copy and identify where the data came from. A downloaded report, a form export and a manually maintained sheet have different failure modes. Record the expected header names, number of columns, and whether the first line is a header. Compare the number of records before and after cleaning so accidental row loss is visible."],
      ["Understand quotation and delimiter rules", "A CSV field may legally contain commas, line breaks and double quotation marks. A robust parser uses quote delimiters rather than splitting every line on a comma. For example, a description reading ‘Bolts, assorted’ must stay in one field when surrounded by quotes. Data from some regional spreadsheet settings uses semicolons or tab characters instead of commas; detect the separator before exporting."],
      ["Choose the right duplicate rule", "An identical row may be an accidental repeated export, but repeated customer names or order totals do not prove that two records represent the same transaction. Keep a stable record ID when possible. If your workflow removes exact duplicates, audit a few removed records and retain the original file for rollback."],
      ["Protect identifiers and validate downstream", "Postal codes, SKU values and account-like identifiers often begin with zero. Spreadsheet programs can convert them into numbers and drop those zeros. Preserve them as text, inspect date formats, and check non-ASCII names. After exporting a cleaned CSV, reopen it and test it with the intended receiving program or import pipeline."],
    ], links: ["/csv", "/csv-cleaner", "/remove-duplicate-csv-rows", "/csv-delimiter-converter"]
  },
  "/guides/pdf-redaction-and-signing": {
    title: "PDF annotations, redaction and signatures explained",
    description: "Know the difference between visible PDF markup, irreversible redaction, drawn signatures and certificate-backed digital signatures.",
    sections: [
      ["Annotations are not edits to the underlying text", "Highlighting a passage or drawing a rectangle places visible content on a PDF page. Depending on the tool, text beneath an overlay may remain selectable, searchable or extractable. Treat these changes as markup until you have independently verified their effect on the underlying document structure."],
      ["Redaction needs removal, not just concealment", "A black box can hide sensitive text to the eye while leaving it in the file. Confidential information may also appear in metadata, attachments, previous versions or annotations. Use a purpose-built redaction workflow, inspect the final PDF with text extraction, and follow your organization's approved document handling rules. SuiteOfficeLab's visible overlay controls should not be treated as secure redaction."],
      ["Drawn and digital signatures serve different needs", "A drawn signature is an image or vector mark on the page. A cryptographic digital signature normally contains certificate information and can provide tamper evidence. Whether an electronic signature is accepted depends on the organization, document and applicable rules. For any important contract, verify the recipient's requirements rather than relying on appearance alone."],
      ["Review exports before sharing", "Place markup and signatures on the correct page, save a new copy, and reopen it. Check scale, page count and text readability. Retain the source PDF separately in case a recipient requests a clean version."],
    ], links: ["/pdf", "/sign-document", "/print-pdf", "/view-pdf"]
  },
  "/guides/word-pdf-conversion": {
    title: "What changes when converting Word files to PDF",
    description: "A guide to DOCX structure, fonts, page breaks, browser rendering and reliable document-review steps.",
    sections: [
      ["Editable documents and fixed pages", "DOCX files describe paragraphs, styles, sections, tables and other editable elements. PDFs focus on where content appears on fixed pages. Exporting to PDF is useful for distribution, but the appearance can change if the rendering engine has different fonts, line heights or page margins."],
      ["Preview the complex portions", "Before conversion, locate tables, custom fonts, numbered lists, headers, footers and page breaks. These areas often change when a browser renders a document. Compare them with the original after export, not just the opening paragraph. A quick check of the last page catches many pagination errors."],
      ["Choose HTML or plain text only when appropriate", "HTML can preserve some headings and structure for browser presentation; plain text is better for content extraction or quick copy-and-paste. Neither is a guaranteed substitute for an editable original DOCX. Save the original and avoid repeatedly converting back and forth among formats."],
      ["Before sending an official document", "Open the exported PDF in a second viewer, inspect every page, and print a preview if physical output matters. For legal, regulatory, or precisely branded documents, use the organization's approved Office-to-PDF workflow and check version compatibility."],
    ], links: ["/word", "/convert-word", "/view-word", "/print-word"]
  },
  "/guides/presentation-compatibility": {
    title: "Checking PPTX presentations before sharing",
    description: "How to review slide text, themes, fonts and unsupported media when opening presentations in a browser.",
    sections: [
      ["Think in two layers: content and design", "The slide titles, speaker notes and text boxes carry the substance of a deck. Themes, masters, animations and embedded media determine presentation behavior. A tool that can read and revise slide text may not reproduce the entire visual or interactive experience."],
      ["Review slide order and hierarchy", "Start by confirming the number of slides, the title of each section and the position of the conclusion. Check for duplicate or missing slides. A text preview is useful for content review even when advanced slide design is unavailable."],
      ["Common causes of layout differences", "Custom fonts may be substituted on another device. Charts, 3D objects, SmartArt, transitions and video links can depend on software or external files. When converting or exporting, inspect a copy in the software that will actually display the presentation."],
      ["A simple handoff checklist", "Use legible titles, avoid excessive text, preserve the source PPTX, test embedded media, and provide a PDF backup when the event or recipient accepts one. Keep a separate copy before experimenting with browser-based edits."],
    ], links: ["/powerpoint", "/view-powerpoint", "/office-tools"]
  },
  "/guides/video-compression-basics": {
    title: "Reduce video size without losing the details that matter",
    description: "A practical introduction to resolution, bitrate, frame rate and browser-based MP4 or MOV compression.",
    sections: [
      ["Start with the destination requirements", "A learning platform may have a maximum upload size while a presentation needs readable slides. Check the target's accepted file extension, size limit and preferred codec before compressing. Compressing to the smallest possible file is not always the right objective."],
      ["Bitrate and content complexity", "Bitrate is one of the main controls over file size. Fast motion, low-light noise and screen recordings with fine text can show visible artifacts at aggressive settings. A static webcam shot may tolerate lower bitrate than a screen recording of a spreadsheet."],
      ["Evaluate a short representative sample", "Choose a segment containing the most demanding content—small text, quick motion and voice audio. Compress it with moderate settings and listen for sync problems. If the sample looks acceptable, then process the full video."],
      ["Keep the original and check the export", "Browser media processing can strain memory and CPU, particularly on mobile devices. Always retain the source until the exported file plays from start to finish on the target device. MP4 and MOV are containers and can hold different codecs."],
    ], links: ["/compress-video", "/compress-mp4", "/compress-mov"]
  },
  "/guides/file-conversion-checklist": {
    title: "A safe checklist for converting office and media files",
    description: "What to verify before and after converting PDFs, pictures, spreadsheets, audio, or ZIP files.",
    sections: [
      ["Work on a copy", "Preserve the original file and convert a duplicate. This matters most with source material that is hard to recreate, such as scanned documents, family pictures or exported business records. A new extension does not guarantee the file data has been converted."],
      ["Choose the output based on the next step", "Use PDF when page layout matters, CSV when editable records matter, JPG for broad image compatibility and WAV when an editor expects an audio container. Each output has tradeoffs: JPEG is lossy, CSV discards formatting and an image-based PDF lacks selectable text."],
      ["Validate more than the filename", "Check the opening program, page count, data row count, duration, orientation, readability, and a few edge cases. The most important test is opening the result in the actual receiving application or upload system."],
      ["Understand privacy and third-party resources", "Most of SuiteOfficeLab's editor operations use browser-side code, but site assets, advertising code, media codecs and archive search can involve outside services. Don't assume a website is suitable for highly sensitive files without reviewing its privacy notice and your organization's data-handling rules."],
    ], links: ["/office-tools", "/convert-csv", "/convert-pdf", "/jpg-to-pdf"]
  },
});

export const POLICY_PAGES = Object.freeze({
  "/about": {
    title: "About SuiteOfficeLab",
    description: "What SuiteOfficeLab is, who its browser utilities are for, and how its tools differ from full desktop office software.",
    sections: [
      ["What we provide", "SuiteOfficeLab is a collection of browser-based utilities for everyday file work: editing CSV tables, previewing office files, annotating PDFs, converting supported file formats and compressing compatible media. The focus is on completing one practical task with controls available from a modern browser."],
      ["Who it is for", "Students, small organizations, office workers and other visitors can use the tools to prepare copies of documents, check a file before sharing it, or convert it for a system with different format requirements. The tools are not affiliated with Microsoft, Adobe, the Internet Archive, or the creators of third-party content they may display."],
      ["Important limits", "Browser utilities cannot guarantee exact preservation of complex Word documents, presentations, fonts, animations, secure PDF redaction or digital-signature certification. We publish explanatory guides and encourage users to test the resulting export before relying on it."],
      ["Feedback", "If a tool fails, a conversion changes important content, or a page contains unclear instructions, send the file type, browser name and a non-sensitive description of the issue to cloudcordvoice@protonmail.com. Please do not email confidential documents."],
    ], links: ["/contact", "/guides/file-conversion-checklist", "/office-tools"]
  },
  "/contact": {
    title: "Contact SuiteOfficeLab",
    description: "Get in touch about office tool bugs, accessibility problems, technical issues and published guides.",
    sections: [
      ["Contact email", "Send a message to cloudcordvoice@protonmail.com for general feedback, tool problems, incorrect instructions, accessibility issues or questions about site policies. This is a contact route, not a promise of real-time technical support."],
      ["Useful details for a bug report", "Include the page URL, your operating system, browser and version, the input file type and a brief description of the result you expected. If there was an error message, quote it. A sample made from non-sensitive test data is safer than attaching a private document."],
      ["Privacy reminder", "Do not send identity documents, private financial records, personal health records, passwords or other sensitive files by email. Describe the problem or create a synthetic sample instead."],
    ], links: ["/privacy", "/about"]
  },
  "/privacy": {
    title: "Privacy Policy",
    description: "How SuiteOfficeLab browser tools, external archive searches, local settings, and third-party advertising resources can affect data handling.",
    sections: [
      ["Browser-based file processing", "Many editors and converters use JavaScript and browser APIs to read a file you select and create a downloadable result on your device. That describes how those particular tools are designed, not a promise that every service on this website is entirely offline. Avoid using any web-based tool for highly sensitive data unless it is approved by your organization."],
      ["External connections", "The archive search feature can send search terms and requests for metadata or file previews to the Internet Archive and a third-party archive proxy. Video conversion can load FFmpeg runtime files from an external content delivery network. Your browser can also contact providers that serve site infrastructure, scripts and other resources."],
      ["Advertising and cookies", "This site includes Google AdSense-related code and may use advertising technologies after the publisher account and site are approved. Google and its partners may use cookies or comparable identifiers for advertising, measurement, fraud prevention and related functions, subject to applicable choices and regulations. Consult Google's privacy materials for details and consider your browser settings. The site owner must configure any consent mechanism required by visitor location before serving personalized ads."],
      ["Browser storage and retention", "Some interface preferences or archive-browser state may be stored in your browser's localStorage. Clear site data through browser settings to remove locally stored preferences. This notice does not claim to control how external providers retain their own server logs or requests."],
      ["Questions and updates", "For privacy questions, email cloudcordvoice@protonmail.com. This document reflects the described source code as of November 5, 2026; review it whenever you add analytics, authentication, uploads, backend storage or advertising partners."],
    ], links: ["/contact", "/terms", "/about"]
  },
  "/terms": {
    title: "Terms of Use",
    description: "Usage conditions, conversion limitations, intellectual-property considerations and general disclaimers for SuiteOfficeLab.",
    sections: [
      ["Permitted use", "Use SuiteOfficeLab only with files and material that you are authorized to access, process or share. You remain responsible for respecting copyrights, confidentiality and your organization's document-handling rules. Do not use the service to distribute unlawful content or interfere with its operation."],
      ["Tools and output accuracy", "The tools are provided on an as-available basis. Browser limitations, unsupported codecs, complex document layouts or malformed files can cause errors or output differences. Verify any exported file before submitting, publishing, signing, printing or relying on it for an important decision."],
      ["No professional certification", "SuiteOfficeLab does not provide legal advice, certified electronic signatures, secure document redaction, identity verification, guaranteed archival storage or guaranteed compatibility with third-party applications."],
      ["Third-party resources", "Internet Archive data and other external resources remain subject to their providers' policies, licenses and availability. Trademarks and software names belong to their respective owners; references identify file formats or compatibility goals rather than an endorsement."],
      ["Questions", "Contact cloudcordvoice@protonmail.com with site-related questions. Changes to these terms should be reviewed whenever site capabilities or data practices change."],
    ], links: ["/privacy", "/contact", "/about"]
  },
});

export const INFORMATION_PAGES = Object.freeze({...EDITORIAL_PAGES, ...POLICY_PAGES});
export const INFORMATION_PATHS = Object.freeze(Object.keys(INFORMATION_PAGES));
export const CONTACT_EMAIL = "cloudcordvoice@protonmail.com";

export function getToolGuide(path) {
  const alias = {"/convert-pdf-to-jpg":"/pdf-to-jpg", "/convert-jpg-to-pdf":"/jpg-to-pdf", "/convert-heic-to-jpg":"/heic-to-jpg"};
  return TOOL_GUIDES[alias[path] || path] || null;
}
