import React, { useState } from "react";
import InputField from "./ui/InputField";
import TextArea from "./ui/TextArea";
import SelectInput from "./ui/SelectInput";
import Button from "./ui/Button";

export default function DetailsStep({ onSubmit, editValues }) {
  const [formValues, setFormValues] = useState({
    email: "" || editValues.email === null ? "" : editValues.email,
    description: "" || editValues.description,
    url: "" || editValues.websiteUrl || editValues.url,
    category: "" || editValues.category,
    imageUrl: "" || editValues.imageUrl,
    public_id: editValues.publicId,
  });

  // Capture form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    console.log("Form values===>", formValues);
    e.preventDefault(); // Prevent traditional form submission
    onSubmit(formValues); // Pass formValues to parent component's onSubmit
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-white dark:text-dark-textPrimary pb-8">
        Step 1: Website Details
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6 ">
        <InputField
          name="email"
          type="email"
          value={formValues.email}
          onChange={handleChange}
          placeholder="Enter your email"
          className="bg-gray-100 dark:bg-dark-input rounded-lg p-2"
        />
        <TextArea
          name="description"
          value={formValues.description}
          onChange={handleChange}
          placeholder="Enter description"
          required={true}
          className="bg-gray-100 dark:bg-dark-input rounded-lg p-2"
          minLength={30}
        />
        <InputField
          name="url"
          type="url"
          value={formValues.url}
          onChange={handleChange}
          placeholder="https://example.com"
          required={true}
          className="bg-gray-100 dark:bg-dark-input rounded-lg p-2"
        />
        <SelectInput
          name="category"
          value={formValues.category}
          onChange={handleChange}
          required={true}
          options={[
            { value: "web-development", label: "Web Development" },
            {
              value: "full-stack-development",
              label: "Full Stack Development",
            },
            {
              value: "Front-end-development",
              label: "Front-end Development",
            },
            { value: "back-end-development", label: "Back-end Development" },
            { value: "devops", label: "DevOps" },
            { value: "web-design", label: "web Design" },
            { value: "Designer-development", label: "Designer Development" },

            { value: "ui-ux-design", label: "UI/UX Design" },
            { value: "graphic-design", label: "Graphic Design" },
            { value: "data-science", label: "Data Science" },
            { value: "machine-learning", label: "Machine Learning" },
            { value: "mobile-development", label: "Mobile Development" },
            {
              value: "artificial-intelligence",
              label: "Artificial Intelligence",
            },
          ]}
          className="bg-gray-100 dark:bg-dark-input rounded-lg p-2"
        />
        <Button label="Next" type="submit" style="primary" />
      </form>
    </div>
  );
}
