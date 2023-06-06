import { useForm } from "react-hook-form";
import { supabaseClient } from "../../supabase-client";

const UpdateProfile = () => {
  const { register, handleSubmit, formState } = useForm();

  const updateData = async (formData) => {
    const {
      data: { user },
    } = await supabaseClient.auth.getUser();

    const { data } = await supabaseClient
      .from("profiles")
      .upsert({ id: user.id, ...formData });

    console.log(data);
  };

  return (
    <div>
      <h1>Completa il tuo profilo</h1>
      <form onSubmit={handleSubmit(updateData)}>
        <input
          type="text"
          {...register("username", { required: true, minLength: 4 })}
        />
        {/* <input type="text" name="username" onChange={...} onBlur={...} ref={form.username} /> */}
        <input type="text" {...register("website")} />
        <textarea type="text" {...register("bio")} />
        <button type="submit">Aggiorna</button>

        {formState.errors?.username?.type === "required" && (
          <span>Il campo username è required</span>
        )}
        {formState.errors?.username?.type === "minLength" && (
          <span>Username deve avere almeno 4 lettere</span>
        )}
      </form>
    </div>
  );
};

export default UpdateProfile;
