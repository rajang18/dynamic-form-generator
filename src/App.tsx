import React, { useState } from 'react';

const App: React.FC = () => {
  const [jsonSchema, setJsonSchema] = useState<string>(`{
    "formTitle": "Sample Form",
    "fields": [
      { "id": "name", "type": "text", "label": "Name", "required": true },
      { "id": "email", "type": "email", "label": "Email", "required": true }
    ]
  }`);

  const [formData, setFormData] = useState<{ [key: string]: string }>({});

  const handleJsonChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonSchema(event.target.value);
  };

  const handleInputChange = (id: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  let schema;
  try {
    schema = JSON.parse(jsonSchema);
  } catch (error) {
    schema = null;
  }

  return (
    <div className="flex h-screen">
      {/* Left Panel - JSON Editor */}
      <div className="w-1/2 p-4 border-r">
        <h2 className="text-lg font-bold mb-4">JSON Editor</h2>
        <textarea
          className="w-full h-full border p-2"
          value={jsonSchema}
          onChange={handleJsonChange}
        />
      </div>

      {/* Right Panel - Form Preview */}
      <div className="w-1/2 p-4">
        <h2 className="text-lg font-bold mb-4">Form Preview</h2>
        {schema ? (
          <form>
            <h3 className="text-xl font-semibold mb-4">{schema.formTitle}</h3>
            {schema.fields.map((field: any) => (
              <div key={field.id} className="mb-4">
                <label className="block mb-2 font-medium">{field.label}</label>
                <input
                  type={field.type}
                  required={field.required}
                  className="border p-2 w-full"
                  onChange={(e) => handleInputChange(field.id, e.target.value)}
                />
              </div>
            ))}
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={(e) => {
                e.preventDefault();
                console.log("Form Data:", formData);
              }}
            >
              Submit
            </button>
          </form>
        ) : (
          <p className="text-red-500">Invalid JSON</p>
        )}
      </div>
    </div>
  );
};

export default App;
