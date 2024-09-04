import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input, Button, Upload } from "antd";
import { UploadOutlined, LeftOutlined, CloseOutlined } from "@ant-design/icons";
import Header from "../header/Header";
import styles from "./createpost.module.css";
import { useNavigate } from "react-router-dom";
import { useCreatePost, useSkills } from "../../lib/state";
import { Skill } from "../../lib/types";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "./firebaseConfig";

const { TextArea } = Input;

const CreatePost = () => {
  const { control, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const { mutate: createPost } = useCreatePost();
  const { skills } = useSkills();
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (file: any) => {
    if (!file) return null;

    setUploading(true);
    const storageRef = ref(storage, `thumbnails/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise<string | null>((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          console.error("Upload failed:", error);
          setUploading(false);
          reject(null);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            setThumbnailUrl(downloadURL);
            setUploading(false);
            resolve(downloadURL);
          } catch (error) {
            console.error("Error getting download URL:", error);
            setUploading(false);
            reject(null);
          }
        }
      );
    });
  };

  const onSubmit = async (data: any) => {
    try {
      const tagIds = selectedSkills
        .map((skill) => skills?.find((s) => s.name === skill)?.id)
        .filter((id): id is number => id !== undefined);

      const newTags = selectedSkills.filter(
        (skill) => !skills?.some((s) => s.name === skill)
      );

      // Handle the thumbnail upload
      if (data.thumbnail && data.thumbnail.file) {
        await handleUpload(data.thumbnail.file);
      }

      const postData = {
        title: data.title,
        description: data.description,
        articleLink: data.articleLink,
        videoLink: data.videoLink,
        tagIds,
        newTags,
        thumbnailUrl: thumbnailUrl || "", // Use the existing state for thumbnail URL
      };

      console.log("Post Data:", postData);

      createPost(postData, {
        onSuccess: (response) => {
          console.log(response);
          navigate("/dashboard");
        },
        onError: (error) => {
          console.error("Post creation failed:", error);
        },
      });
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  const handleCustomUpload = async ({ file }: any) => {
    await handleUpload(file);
  };

  const addSkill = (skill: string) => {
    if (!selectedSkills.includes(skill) && selectedSkills.length < 10) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const removeSkill = (skill: string) => {
    setSelectedSkills(selectedSkills.filter((s) => s !== skill));
  };

  return (
    <div className={styles.container}>
      <Header isLoggedIn={true} page="createpost" />
      <div className={styles.formContainer}>
        <div className={styles.header}>
          <Button
            icon={<LeftOutlined />}
            type="link"
            onClick={() => navigate(-1)}
            className={styles.backButton}
          />
          <h2 className={styles.title}>Create New Post</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.formGroup}>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Title"
                  className={styles.input}
                />
              )}
            />
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextArea
                  {...field}
                  placeholder="Description"
                  className={styles.input}
                />
              )}
            />
          </div>
          <div className={styles.formGroup}>
            <Controller
              name="videoLink"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Video Link"
                  className={styles.input}
                />
              )}
            />
            <Controller
              name="articleLink"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Article Link"
                  className={styles.input}
                />
              )}
            />
          </div>
          <div className={styles.formGroup}>
            <div>
              <h3 className={styles.label}>Skills</h3>
              <div className={styles.skillsInput}>
                {selectedSkills.map((skill) => (
                  <span key={skill} className={styles.selectedSkill}>
                    {skill}
                    <CloseOutlined
                      className={styles.removeIcon}
                      onClick={() => removeSkill(skill)}
                    />
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.suggestedSkills}>
            <h3 className={styles.label}>Suggested Skills</h3>
            <div className={styles.suggestedSkillsList}>
              {skills?.map((skill: Skill) => (
                <button
                  type="button"
                  key={skill.id}
                  className={styles.suggestedSkill}
                  onClick={() =>
                    selectedSkills.includes(skill.name)
                      ? removeSkill(skill.name)
                      : addSkill(skill.name)
                  }
                  disabled={selectedSkills.includes(skill.name)}
                >
                  {skill.name}{" "}
                  {selectedSkills.includes(skill.name) ? (
                    <CloseOutlined />
                  ) : (
                    "+"
                  )}
                </button>
              ))}
            </div>
          </div>
          <div className={styles.uploadContainer}>
            <Upload customRequest={handleCustomUpload}>
              <Button icon={<UploadOutlined />} className={styles.uploadButton}>
                Upload Thumbnail
              </Button>
            </Upload>
          </div>
          <Button
            type="primary"
            htmlType="submit"
            className={styles.submitButton}
            disabled={uploading}
          >
            Post
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
