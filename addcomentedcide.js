{
    // eslint-disable-next-line no-self-compare
    1 === 1 && (
      <div> <Divider />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item md={12}>
              <Typography variant="h4"> Bike Details</Typography>
            </Grid>
            <Grid item md={6} xs={12}>
              {/* <MuiAutoComplete
                control={control}
                errors={errors}
                register={register}
                options={categoriesOptions}
                label="Category"
                name="category"
                validation={{ required: 'This is required' }}
              /> */}
              {/* {renderAutocomplete('category', 'Category', categoriesOptions, { required: 'This is required' })} */}
            </Grid>
            <Grid item md={6} xs={12}>
              {/* <MuiAutoComplete
                control={control}
                errors={errors}
                register={register}
                options={productUserOptions}
                label="Product User"
                name="productUser"
              /> */}
            </Grid>
            <Grid item md={6} xs={12}>
              {/* <MuiAutoComplete
                control={control}
                errors={errors}
                register={register}
                options={sizesOptions}
                label="Frame Size"
                name="frameSize"
                validation={{ required: 'This is required' }}
              /> */}
            </Grid>
            <Grid item md={6} xs={12}>
              <MuiAutoComplete
                control={control}
                errors={errors}
                register={register}
                options={suspensionsOptions}
                label="Suspension Type"
                name="fork"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              {/* <MuiAutoComplete
                control={control}
                errors={errors}
                register={register}
                options={materialsOptions}
                label="Fork Material"
                name="forkMaterial"
              /> */}
            </Grid>
            <Grid item md={6} xs={12}>
              {/* <MuiAutoComplete
                control={control}
                errors={errors}
                register={register}
                options={materialsOptions}
                label="Frame Material"
                name="frameMaterial"
              /> */}
            </Grid>
            {renderTextField('wheelSize', 'Wheel Size')}
            {/* {renderTextField('weight', 'Weight')}
            {renderTextField('shifters', 'Shifters')}
            {renderTextField('crankset', 'Crankset')}
            {renderTextField('frontDerailer', 'Front Derailer')}
            {renderTextField('rearDerailer', 'Rear Derailer')}
            {renderTextField('speed', 'Speed')} */}

          </Grid>
        </CardContent>
      </div>
    )
  }