export default defineNuxtRouteMiddleware(async (to) => {
  const user = await getCurrentUser();
  if (!user) {
    return navigateTo({
      path: "/login",
      query: {
        redirect: to.fullPath,
      },
    });
  } else if (user.uid === "HxK8PKbWdTVquRYhLLtWI1kFhR13" || user.uid === "hiuFiq6pHHeQ345JCxf64LnZtB62") {
    setPageLayout("admin");
  } else {
    throw createError({
      statusCode: 401,
      statusMessage: "You are not authorized to view this page.",
    });
  }
});
